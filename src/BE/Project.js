import MESSAGES_PASSING from "../shared/message-passing";
import ROUTES from "../shared/fe-routes";
import { ImageEntity } from "../shared/entities";

import messageHandler from "./message-handler";

import generateFileHash from "./utils/generate-file-hash";
import normalizePath from "./utils/normalize-path";
// const filesystem = require("../filesystem");
// const db = require("../db");
// const { filterImages } = require("./filter");
// const image = require("../image");

// entities
// const Image = require("../entities/Image");

// // utils
// const { recursivelyFindImages } = require("../utils/find-image-path-recursive");
// const logFunctionPerf = require("../utils/log-function-perf");
// const generateFileHash = require("../utils/generate-hash");

import findImagePaths from "./utils/find-images-in-path";

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
 * Cental entity in the BE.
 * Holds the business logic.
 */
class Project {
  constructor() {
    this.imageMap = {};
  }

  /**
   * Initialize taggr project
   * @param {string} rootPath
   */
  async create(rootPath) {
    console.log("[BE] create: ", rootPath);

    // 0. update FE route
    messageHandler.postMessage(
      MESSAGES_PASSING.MESSAGES.setRoute(ROUTES.PROCESSING_PAGE)
    );

    // 1. Locate image paths in project
    const imagePathsInProject = await findImagePaths(rootPath);

    // 2. Generate in memory structure, and calculate the file hashes
    for (const imagePath of imagePathsInProject) {
      const hash = await generateFileHash(imagePath);
      this.imageMap[hash] = new ImageEntity({
        hash,
        path: normalizePath(imagePath),
        rawPath: imagePath,
        tags: null,
        location: null,
      });
    }

    console.log("this.imageMap");
    console.log(this.imageMap);

    // 3. Optimize images
    const sharp = require("sharp");

    for (let i = 0; i < 3; i++) {
      sharp({
        create: {
          width: 480,
          height: 480,
          channels: 4,
          background: { r: 255, g: 0, b: 255, alpha: 0.5 },
        },
      })
        .png()
        .toFile(`/Users/alain/Downloads/output/hola${i}.png`, (err, info) => {
          if (err) {
            console.log("err in test.png: ", err);
          }
          if (info) {
            console.log(i);
            // console.log("test.png info: ", info);
          }
        });
    }

    return;
    // const outputDir = path.join(paths.data, "/images");
    // const outputDir = "/Users/alain/Downloads/output";
    // await resizeImages(imagePathsInProject, outputDir);

    // 4. Store images in DB
    // Object.keys(this.imageMap).forEach((key) => {
    //   db.saveImage(this.imageMap[key]);
    // });
    // console.log(await db.getImages());

    // populate FE
    services.services.updateImages({
      images: transformImageMaptoImageList(this.imageMap),
      imagesWithLocation: [],
    });

    services.services.setRoute("DASHBOARD_PAGE");

    this.isProcessingActive = false;

    // Projecs ML of images
    this.process();
  }

  /**
   * ML the shit out of the images
   */
  async process() {
    // TODONOW: diff to only process the non stored ones
    const imageHashToProcess = Object.keys(this.imageMap);

    const toProcess = Object.keys(this.imageMap).length;

    for (const hash of imageHashToProcess) {
      console.log(await image.process(this.imageMap[hash].rawPath));
    }
    return;
    while (this.isProcessingActive && imagePathsToProcess.length) {
      //   const imagePath = imagePathsToProcess.shift();
      //   const hash = filesystem.generateMD5HashFromString(imagePath);

      services.services.updateTask({
        name: `Processing ${toProcess} memories!`,
        isOngoing: true,
        percentage: Math.ceil(
          ((toProcess - imagePathsToProcess.length) * 100) / toProcess
        ),
      });

      imageHashMap[hash] = {
        ...imageHashMap[hash],
        ...(await image.process(imagePath)),
      };
    }

    if (!this.isProcessingActive) return;

    services.services.updateTask({
      isOngoing: false,
    });

    // send location pictures
    services.services.updateImages({
      images: transformImageMaptoImageList(imageHashMap),
      imagesWithLocation: transformImageMaptoImageList(
        store.getImagesWithLocation()
      ),
    });
  }

  /**
   * Filter images
   *
   * @param {FilterType} filters
   * @returns {{images: ImageType[], imagesWithLocation: ImageType[]}} images
   */
  filterImages(filters) {
    return filterImages(this.imageMap, filters);
  }

  destroy() {
    // reset project
  }
}

export default new Project();
