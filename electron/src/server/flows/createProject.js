// const { RENDERER_ACTIONS } = require("../../shared/actions");

const {
  recursivelyFindImages,
  generateImageHashMap,
  transformImageMaptoImageList,
  generateMD5Hash,
} = require("../operations/utils");
const {
  processImage,
  getTopTags,
  getImagesWithLocation,
} = require("../operations/imageManipulation");
// import { sendToRenderer, sendToRendererThrottled } from "./services/utils";
const { setProjectRootFolderPath, setImageHashMap } = require("../store");

/**
 * Flow for initializing and generating project.
 * Each flow updates the store information when completed, acting as an atomic operation.
 * @param {string} projectRootFolderPath
 */
class CreateProject {
  constructor() {
    this.isActive = false;
  }

  notify(message, percentage = 0, isOngoing = true) {
    console.log("notify UI");
    // TODONOW: implement;
    // sendToRendererThrottled({
    //   type: RENDERER_ACTIONS.setTask.type,
    //   payload: {
    //     isOngoing,
    //     name: message,
    //     percentage: percentage,
    //   },
    // });
  }

  async process(projectRootFolderPath) {
    this.isActive = true;

    // object that contains all the project information
    let imageHashMap = {};

    setProjectRootFolderPath(projectRootFolderPath);

    // LOCATE PICTURES
    this.notify("Locating all the pictures!");
    const imagePathsToProcess = await recursivelyFindImages(
      projectRootFolderPath
    );

    // GENERATE STRUCTURE
    imageHashMap = generateImageHashMap(imagePathsToProcess);
    // TODONO: send to renderer
    // sendToRenderer({
    //   type: RENDERER_ACTIONS.setImages.type,
    //   payload: transformImageMaptoImageList(imageHashMap),
    // });

    // PROCESS IMAGES
    const toProcess = imagePathsToProcess.length;
    let processed = 0;

    console.time("processAllImages");
    while (this.isActive && imagePathsToProcess.length) {
      const rawImagePath = imagePathsToProcess.shift();
      const hash = generateMD5Hash(rawImagePath);
      const imagePath = imageHashMap[hash].path;

      // TODONO: send to renderer throthled
      // sendToRendererThrottled({
      //   type: RENDERER_ACTIONS.setTask.type,
      //   payload: {
      //     name: `Processing ${toProcess} memories!`,
      //     percentage: Math.floor((processed * 100) / toProcess),
      //   },
      // });

      imageHashMap[hash] = {
        ...imageHashMap[hash],
        ...(await processImage(rawImagePath, imagePath)),
      };

      processed++;
    }

    if (!this.isActive) return;

    console.timeEnd("processAllImages");

    // SEND IMAGES WITH LOCATION
    // TODONO: send to renderer
    // sendToRenderer({
    //   type: RENDERER_ACTIONS.setImagesWithLocation.type,
    //   payload: getImagesWithLocation(imageHashMap),
    // });

    this.notify("finish processing", 100, false);

    // PERSIST IN STORE
    setImageHashMap(imageHashMap);
  }

  stop() {
    this.isActive = false;
  }
}

module.exports = CreateProject;