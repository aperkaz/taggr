import * as Comlink from "comlink";
import queue from "async/queue";
import { TASKS } from "../tasks";
import appStore from "../appStore";
import uiStore from "../../uiStore";
import {
  generateMD5Hash,
  generateImageData,
  getImagesWithoutTags,
} from "../../utils";
// TODO: fix: import warning
import RecursiveImageFinderWorker from "../../workers/recursiveImageFinder.worker";
import FilterResultsWorker from "../../workers/filderResults.worker";
import ImageTaggingWorker from "../../workers/imageTagging.worker";
// TODO: improvement: add import alias

let imagesTagged, imagesToTag;

const imageTaggingQueue = queue(
  async ({ imageHash, imageTaggingWorker }, callback) => {
    const path = appStore.imageHashMap[imageHash].path;

    let imageData = await generateImageData(path);

    const tags = await imageTaggingWorker.process(imageData);

    // save results in appStore
    appStore.imageHashMap[imageHash] = { path: imageHash, tags };

    imageData = null;
    return callback(false);
  },
  2
);

export default queue(async ({ name, payload }, callback) => {
  console.log("--");
  console.log("Main Queue processing: ", name);
  // console.log("Main Queue, payload: ", payload);

  switch (name) {
    case TASKS.SET_UI_ROUTE:
      uiStore.activeRoute = payload;
      break;

    // project creation
    case TASKS.CLEAN_PROJECT_DATA:
      uiStore.tagSeachValue = "";
      uiStore.filteredImageList = [];
      uiStore.tagCountList = [];

      appStore.projectRootFolderPath = "";
      appStore.imageHashMap = {};
      break;

    case TASKS.SET_PROJECT_ROOT_FOLDER_PATH:
      appStore.projectRootFolderPath = payload;
      break;

    case TASKS.SEARCH_IMAGE_PATHS:
      const imageFinderWorker = Comlink.wrap(new RecursiveImageFinderWorker());
      const imagePathList = await imageFinderWorker.process(payload);
      // store in appStore
      imagePathList.forEach((imagePath) => {
        const hash = generateMD5Hash(imagePath);
        appStore.imageHashMap[hash] = { path: imagePath, tags: null };
      });
      break;

    case TASKS.SEARCH_IMAGES_BY_TAG:
      const filterResultsWorker = Comlink.wrap(new FilterResultsWorker());
      let results = await filterResultsWorker.process(
        appStore.imageHashMap,
        payload
      );

      uiStore.filteredImageList = results;
      break;

    case TASKS.CALCULATE_IMAGE_TAGS:
      const imageTaggingWorker = Comlink.wrap(new ImageTaggingWorker());

      let imageHashListToProcess = getImagesWithoutTags(appStore.imageHashMap);

      imagesToTag = imageHashListToProcess.length;
      imagesTagged = 0;

      imageHashListToProcess.forEach((imageHash) => {
        imageTaggingQueue.push({ imageHash, imageTaggingWorker }, () => {
          imagesTagged++;
          console.log(`Processing: ${imagesTagged} / ${imagesToTag}`);
        });
      });

      break;
  }

  callback();
}, 1);
