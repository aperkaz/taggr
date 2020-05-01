import * as Comlink from "comlink";
import queue from "async/queue";
import { TASKS } from "../tasks";
import appStore from "../appStore";
import uiStore from "../../uiStore";
import {
  generateMD5Hash,
  generateImageData,
  calculateImagesThatNeedTagCalculation,
} from "../../utils";
// TODO: fix: import warning
import RecursiveImageFinderWorker from "../../workers/recursiveImageFinder.worker";
import FilterResultsWorker from "../../workers/filderResults.worker";
import ImageTaggingWorker from "../../workers/imageTagging.worker";
import { Callback } from "@tensorflow/tfjs";
// TODO: improvement: add import alias

// const imageTaggingQueue= queue(({name,payload}, callback)=> {

// },1);

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
      // TODO: interate over the appStore structure, and for the images that have tags: null, run algoritm

      let imageHashListToProcess = calculateImagesThatNeedTagCalculation(
        appStore.imageHashMap
      );

      const imageTaggingWorker = Comlink.wrap(new ImageTaggingWorker());

      let imageHashedToProcessCount = imageHashListToProcess.length;

      console.time("process ALL");

      while (imageHashListToProcess.length > 0) {
        const remaining = imageHashListToProcess.length;

        // TODONOW: add visibility of tasks in UI
        // update analysis status in uiStore
        // uiStore.tagProcessingStatus = `To process: ${remaining} / ${imagesToProcessCount}`;

        console.log(`To process: ${remaining} / ${imageHashedToProcessCount}`);

        // console.time("processImage");

        const imageHash = imageHashListToProcess.pop();
        // const hash = generateMD5Hash(imagePath);
        const imageData = await generateImageData(
          appStore.imageHashMap[imageHash].path
        );

        // console.time("classify");
        const tags = await imageTaggingWorker.process(imageData);
        // console.timeEnd("classify");

        // save results in appStore
        appStore.imageHashMap[imageHash] = { path: imageHash, tags };

        // console.timeEnd("processImage");
      }

      console.timeEnd("process ALL");

      // TODONOW: move into queue
      break;
  }

  callback();
}, 1);
