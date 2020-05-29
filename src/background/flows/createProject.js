import { RENDERER_ACTIONS } from "../../shared/actions";

import {
  recursivelyFindImages,
  generateImageHashMap,
  transformImageMaptoImageList,
  generateMD5Hash,
} from "../operations/utils";
import {
  processImage,
  getTopTags,
  getImagesWithLocation,
} from "../operations/imageManipulation";
import { sendToRenderer, sendToRendererThrottled } from "../services/utils";
import { setProjectRootFolderPath, setImageHashMap } from "../store";

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
    sendToRendererThrottled({
      type: RENDERER_ACTIONS.setTask.type,
      payload: {
        isOngoing,
        name: message,
        percentage: percentage,
      },
    });
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
    sendToRenderer({
      type: RENDERER_ACTIONS.setImages.type,
      payload: transformImageMaptoImageList(imageHashMap),
    });

    // PROCESS IMAGES
    const toProcess = imagePathsToProcess.length;
    let processed = 0;

    console.time("processAllImages");
    while (this.isActive && imagePathsToProcess.length) {
      const rawImagePath = imagePathsToProcess.shift();
      const hash = generateMD5Hash(rawImagePath);
      const imagePath = imageHashMap[hash].path;

      imageHashMap[hash] = {
        ...imageHashMap[hash],
        ...(await processImage(rawImagePath, imagePath)),
      };

      sendToRendererThrottled({
        type: RENDERER_ACTIONS.setTask.type,
        payload: {
          name: `Processing ${toProcess} memories!`,
          percentage: Math.floor((processed * 100) / toProcess),
        },
      });
      processed++;
    }

    if (!this.isActive) return;

    // SEND TOP 20 TAGS (TODONOW: modify and send send active filters in future)
    sendToRenderer({
      type: RENDERER_ACTIONS.setTags.type,
      payload: await getTopTags(imageHashMap, 20),
    });
    console.timeEnd("processAllImages");

    // SEND IMAGES WITH LOCATION
    sendToRenderer({
      type: RENDERER_ACTIONS.setImagesWithLocation.type,
      payload: getImagesWithLocation(imageHashMap),
    });

    this.notify("finish processing", 100, false);

    // PERSIST IN STORE
    setImageHashMap(imageHashMap);
  }

  stop() {
    this.isActive = false;
  }
}

export default CreateProject;
