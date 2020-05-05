import * as Comlink from "comlink";
import queue from "async/queue";
import { TASKS } from "../tasks";
import appStore from "../appStore";
import uiStore from "../../uiStore";
import {
  generateMD5Hash,
  getImagesWithoutTags,
  generateImageData,
} from "../../utils";
// @ts-ignore
import RecursiveImageFinderWorker from "../../workers/recursiveImageFinder.worker";
// @ts-ignore
import FilterResultsWorker from "../../workers/filderResults.worker";
// @ts-ignore
import ImageTaggingWorker from "../../workers/imageTagging.worker";
// @ts-ignore
import PickTopTagsWorker from "../../workers/pickTopTags.worker";
// TODO: improvement: add import alias

let initializedWorker = new ImageTaggingWorker();

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
      let imageTaggingWorker = Comlink.wrap(initializedWorker);

      let imageHashListToProcess = getImagesWithoutTags(appStore.imageHashMap);
      const imagesToTag = imageHashListToProcess.length;
      let imagesTagged = 0;

      while (imageHashListToProcess.length > 0) {
        const imageHash = imageHashListToProcess.pop();
        const path = appStore.imageHashMap[imageHash].path;

        // TODONOW: due to the current store setups, forces whole store re-render.
        // uiStore.tagProcessingStatus = `Processing: ${imagesTagged} / ${imagesToTag}`;

        let imageData = await generateImageData(path);
        const tags = await imageTaggingWorker.process(imageData);
        imagesTagged++;

        // save results in appStore
        appStore.imageHashMap[imageHash] = {
          ...appStore.imageHashMap[imageHash],
          tags,
        };

        // clean up
        imageData = null;

        // artificial await to keep fps up
        await new Promise((r) => setTimeout(r, 80));
      }

      uiStore.tagProcessingStatus = "";

      // When tagging complete, sort tags by occcurrence and pick top 20
      const pickTopTagsWorker = Comlink.wrap(new PickTopTagsWorker());
      const topTags = await pickTopTagsWorker.process(
        appStore.imageHashMap,
        20
      );
      uiStore.tagCountList = topTags;
      uiStore.tagProcessingStatus = null;

      break;
  }

  callback();
}, 1);
