const throttle = require("lodash.throttle");

const {
  recursivelyFindImages,
  generateImageHashMap,
  transformImageMaptoImageList,
  generateMD5Hash,
} = require("../operations/utils");
const {
  processImage,
  getImagesWithLocation,
} = require("../operations/imageManipulation");
const {
  setProjectRootFolderPath,
  setImageHashMap,
  resetStore,
} = require("../store");

const {
  serviceUpdateImages,
  serviceUpdateImagesWithLocation,
  serviceUpdateTask,
} = require("../services");
const throttledUpdateTask = throttle(serviceUpdateTask, 500);

/**
 * Flow for initializing and generating project.
 * Each flow updates the store information when completed, acting as an atomic operation.
 * @param {string} projectRootFolderPath
 */
class CreateProject {
  constructor() {
    this.isActive = false;
  }

  async process(projectRootFolderPath) {
    this.isActive = true;

    throttledUpdateTask({
      name: `Loading images`,
      percentage: 0,
      isOngoing: true,
    });

    // object that contains all the project information
    let imageHashMap = {};
    setProjectRootFolderPath(projectRootFolderPath);

    // LOCATE PICTURES
    const imagePathsToProcess = await recursivelyFindImages(
      projectRootFolderPath
    );

    // GENERATE STRUCTURE
    imageHashMap = generateImageHashMap(imagePathsToProcess);
    serviceUpdateImages(transformImageMaptoImageList(imageHashMap));

    // PROCESS IMAGES
    console.log("process images");
    const toProcess = imagePathsToProcess.length;
    let processed = 0;

    console.time("processAllImages");
    while (this.isActive && imagePathsToProcess.length) {
      throttledUpdateTask({
        name: `Processing ${toProcess} memories!`,
        percentage: Math.floor((processed * 100) / toProcess),
        isOngoing: true,
      });

      const rawImagePath = imagePathsToProcess.shift();
      const hash = generateMD5Hash(rawImagePath);
      const imagePath = imageHashMap[hash].path;

      imageHashMap[hash] = {
        ...imageHashMap[hash],
        ...(await processImage(rawImagePath)),
      };

      processed++;
    }
    console.timeEnd("processAllImages");

    if (!this.isActive) {
      this.cleanUp();
      return;
    }

    serviceUpdateImagesWithLocation(getImagesWithLocation(imageHashMap));

    throttledUpdateTask({
      isOngoing: false,
    });

    // PERSIST IN STORE
    setImageHashMap(imageHashMap);
  }

  stop() {
    this.isActive = false;
  }

  cleanUp() {
    // clean up images, filters... from BE
    resetStore();
  }
}

module.exports = CreateProject;
