const bytenode = require("bytenode");
const path = require("path");
const fs = require("fs");
const filesystem = require("../filesystem");
const image = require("../image");
const store = require("../store");
const services = require("../services");
const db = require("../db");
const { recursivelyFindImages } = require("../utils/find-image-path-recursive");
const logFunctionPerf = require("../utils/log-function-perf");
const generateFileHash = require("../utils/generate-hash");
// const resizeImages = require("../utils/resize-images");

// @ts-ignore-next-line
require("../store/types");

/**
 * Generate main data structure from image path list.
 * Images are stored in the app dire, with hash names
 *
 * @param {string[]} imagePathList
 * @returns {Promise<ImageHashMapType|{}>} imageHashMap
 */
const generateImageHashMap = async (imagePathList) => {
  const imageHashMap = {};

  for (const imagePath of imagePathList) {
    const hash = await generateFileHash(imagePath);
    imageHashMap[hash] = {
      hash,
      path: filesystem.normalizeUrl(imagePath),
      rawPath: imagePath,
      tags: null,
      location: null,
    };
  }

  return imageHashMap;
};

/**
 * Transfrom the imageHashMap to imageList
 *
 * @param {ImageHashMapType|{}} imageHashMap
 * @returns {Object[]} imageList
 */
function transformImageMaptoImageList(imageHashMap) {
  return Object.keys(imageHashMap).map((key) => ({
    ...imageHashMap[key],
  }));
}

/**
 * Singelton class
 */
class Project {
  constructor() {
    this.isProcessingActive = false;
  }

  async create(path) {
    services.services.setRoute("PROCESSING_PAGE");

    this.isProcessingActive = true;

    // 1. Locate image paths in project
    const imagePathsInProject = await recursivelyFindImages(path);

    // 2. Generate in memory structure, and calculate the file hashes
    const imageHashMap = await logFunctionPerf(generateImageHashMap)(
      imagePathsInProject
    );

    // 3. Optimize images
    // const outputDir = path.join(paths.data, "/images");
    // const outputDir = "/Users/alain/Downloads/output";
    // await resizeImages(imagePathsInProject, outputDir);

    // 4. Store images in DB
    Object.keys(imageHashMap).forEach((key) => {
      db.saveImage(imageHashMap[key]);
    });
    // console.log(await db.getImages());

    // populate FE
    services.services.updateImages({
      images: transformImageMaptoImageList(imageHashMap),
      imagesWithLocation: [],
    });

    services.services.setRoute("DASHBOARD_PAGE");

    this.isProcessingActive = false;
  }

  // TODONOW: move all the processing into a separate method
  process() {
    // process images
    // const toProcess = imagePathsToProcess.length;
    // while (this.isProcessingActive && imagePathsToProcess.length) {
    //   const imagePath = imagePathsToProcess.shift();
    //   const hash = filesystem.generateMD5HashFromString(imagePath);
    //   services.services.updateTask({
    //     name: `Processing ${toProcess} memories!`,
    //     isOngoing: true,
    //     percentage: Math.ceil(
    //       ((toProcess - imagePathsToProcess.length) * 100) / toProcess
    //     ),
    //   });
    //   imageHashMap[hash] = {
    //     ...imageHashMap[hash],
    //     ...(await image.process(imagePath)),
    //   };
    // }
    // if (!this.isProcessingActive) return;
    // update store
    // store.setProject({ rootFolder: path, imageHashMap });
    // update task to stopped
    // services.services.updateTask({
    //   isOngoing: false,
    // });
    // // send location pictures
    // services.services.updateImages({
    //   images: transformImageMaptoImageList(imageHashMap),
    //   imagesWithLocation: transformImageMaptoImageList(
    //     store.getImagesWithLocation()
    //   ),
    // });
  }

  destroy() {
    this.isProcessingActive = false;
    store.resetStore();
  }
}

const projectSingelton = new Project();

module.exports = {
  create: projectSingelton.create,
  process: projectSingelton.process,
  destroy: projectSingelton.destroy,
};
