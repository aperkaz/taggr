const services = require("../services");
const filesystem = require("../filesystem");
const db = require("../db");
const { filterImages } = require("./filter");
const image = require("../image");

// entities
const Image = require("../entities/Image");

// utils
const { recursivelyFindImages } = require("../utils/find-image-path-recursive");
const logFunctionPerf = require("../utils/log-function-perf");
const generateFileHash = require("../utils/generate-hash");

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

  async create(path) {
    services.services.setRoute("PROCESSING_PAGE");

    this.isProcessingActive = true;

    // 1. Locate image paths in project
    const imagePathsInProject = await recursivelyFindImages(path);

    // 2. Generate in memory structure, and calculate the file hashes
    for (const imagePath of imagePathsInProject) {
      const hash = await generateFileHash(imagePath);
      this.imageMap[hash] = new Image({
        hash,
        path: filesystem.normalizeUrl(imagePath),
        rawPath: imagePath,
        tags: null,
        location: null,
      });
    }

    // (3). Optimize images - issues!
    // const outputDir = path.join(paths.data, "/images");
    // const outputDir = "/Users/alain/Downloads/output";
    // await resizeImages(imagePathsInProject, outputDir);

    // 4. Store images in DB
    Object.keys(this.imageMap).forEach((key) => {
      db.saveImage(this.imageMap[key]);
    });
    console.log(await db.getImages());

    // populate FE
    services.services.updateImages({
      images: transformImageMaptoImageList(this.imageMap),
      imagesWithLocation: [],
    });

    services.services.setRoute("DASHBOARD_PAGE");

    this.isProcessingActive = false;

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

module.exports = new Project();
