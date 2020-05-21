import {
  setImages,
  setImagesWithLocation,
  setTask,
  setTags,
} from "../../renderer/store";
import { sendToRenderer, sendToRendererThrottled } from "../services/utils";
import recursivelyFindImages from "../features/recursivelyFindImages";
import generateImageHashMap from "../features/generateImageHashMap";
import transformImageMaptoImageList from "../features/transformImageMaptoImageList";
import getTopTags from "../features/getTopTags";

import { setProjectRootFolderPath, setImageHashMap } from "../store";
import generateMD5Hash from "../features/generateMD5Hash";
import getImageLocation, {
  getImagesWihLocation,
} from "../features/getImageLocation";
import getImageTags from "../features/getImageTags";

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
      type: setTask.type,
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

    this.notify("Locating all the pictures!");
    const imagePathsToProcess = await recursivelyFindImages(
      projectRootFolderPath
    );

    // GENERATE STRUCTURE
    imageHashMap = generateImageHashMap(imagePathsToProcess);
    sendToRenderer({
      type: setImages.type,
      payload: transformImageMaptoImageList(imageHashMap),
    });

    const toProcess = imagePathsToProcess.length;
    let processed = 0;
    // PROCESS IMAGES
    while (this.isActive && imagePathsToProcess.length) {
      const rawImagePath = imagePathsToProcess.shift();
      const hash = generateMD5Hash(rawImagePath);
      const imagePath = imageHashMap[hash].path;

      imageHashMap[hash] = {
        ...imageHashMap[hash],
        location: await getImageLocation(rawImagePath),
        tags: await getImageTags(imagePath),
      };
      processed++;

      sendToRendererThrottled({
        type: setTask.type,
        payload: {
          name: `Processing ${toProcess} memories!`,
          percentage: Math.floor((processed * 100) / toProcess),
        },
      });
    }
    if (!this.isActive) return;

    // send top 20 tag list
    sendToRenderer({
      type: setTags.type,
      payload: await getTopTags(imageHashMap, 20),
    });
    // send images with location
    sendToRenderer({
      type: setImagesWithLocation.type,
      payload: getImagesWihLocation(imageHashMap),
    });

    this.notify("finish processing", 100, false);
    setImageHashMap(imageHashMap);
  }

  stop() {
    this.isActive = false;
  }
}

export default CreateProject;
