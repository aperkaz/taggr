const Comlink = require("comlink");
let uiStore = require("./uiStore");
let appStore = require("./appStore");
const createWorkers = require("../workers/index");
const {
  generateMD5Hash,
  loadImage,
  imageTaggingQueuExecutor,
} = require("./utils");

const ACTIONS = {
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",

  SET_ROOT_FOLDER_PATH: "SET_ROOT_FOLDER_PATH",

  CALCULATE_IMAGE_PATHS_IN_ROOT: "CALCULATE_IMAGE_PATHS_IN_ROOT",
  SET_IMAGE_PATHS_IN_MAP: "SET_IMAGE_PATHS_IN_MAP",

  CALCULATE_IMAGE_TAGS: "CALCULATE_IMAGE_TAGS",
  SET_IMAGE_TAGS_IN_MAP: "SET_IMAGE_TAGS_IN_MAP",
  SET_IMAGE_TAGS_IN_COUNTER: "SET_IMAGE_TAGS_IN_COUNTER", // to be displaied in header

  SET_IMAGE_FILTER_TAG_SEARCH_VALUE: "SET_IMAGE_FILTER",
};

const CONSTANTS = {
  PAGES: {
    START_PAGE: "START_PAGE",
    DASHBOARD_PAGE: "DASHBOARD_PAGE",
  },
};

// @ts-ignore
require("../types");

let workers;

const initializeStore = () => {
  workers = createWorkers();
};

// ACTION PROCESSING

/**
 * Trigger action in processor (interface between actions and filesystem, DB, workers...)
 *
 * @param {ActionType} action
 */
const triggerAction = async (action) => {
  await processor(action, uiStore, appStore);
};

/**
 * Process action by triggering side-effects (state mutations, DB access...)
 *
 * @param {ActionType} action
 * @param {uiStoreType} uiStore
 * @param {appStoreType} appStore
 */
const processor = async ({ type, payload }, uiStore, appStore) => {
  // console.log(`P: ${type} : ${JSON.stringify(payload)}`);

  switch (type) {
    case ACTIONS.SET_CURRENT_PAGE:
      uiStore.currentPage = payload;
      break;

    case ACTIONS.SET_ROOT_FOLDER_PATH:
      appStore.rootFolderPath = payload;
      break;

    case ACTIONS.CALCULATE_IMAGE_PATHS_IN_ROOT:
      const imageFinderWorker = Comlink.wrap(
        workers.recursiveImageFinderWorker
      );

      let list = await imageFinderWorker.process(payload);

      await triggerAction({
        type: ACTIONS.SET_IMAGE_PATHS_IN_MAP,
        payload: list,
      });

      await triggerAction({
        type: ACTIONS.SET_IMAGE_FILTER_TAG_SEARCH_VALUE,
        payload: "",
      });

      await triggerAction({
        type: ACTIONS.CALCULATE_IMAGE_TAGS,
        payload: list,
      });

      break;

    case ACTIONS.SET_IMAGE_PATHS_IN_MAP:
      payload.forEach((imagePath) => {
        const imageHash = generateMD5Hash(imagePath);

        appStore.imageHashMap[imageHash] = {
          path: imagePath,
          hash: imageHash,
          tags: null,
        };
      });
      break;

    case ACTIONS.CALCULATE_IMAGE_TAGS:
      console.log("calculate image tags");

      // set worker callback
      workers.imageTaggingWorker.onmessage = async ({ data }) => {
        console.log(data);
        await triggerAction({
          type: ACTIONS.SET_IMAGE_TAGS_IN_MAP,
          payload: { imageHash: generateMD5Hash(data.path), tags: data.tags },
        });

        await triggerAction({
          type: ACTIONS.SET_IMAGE_TAGS_IN_COUNTER,
          payload: { tags: data.tags },
        });

        console.log(uiStore.tagCountMap);
      };

      const { Queue } = require("./utils");
      const imageRenderingQueue = new Queue(
        imageTaggingQueuExecutor(workers.imageTaggingWorker)
      );

      payload.forEach(
        async (imagePath) => await imageRenderingQueue.add(imagePath)
      );

      break;

    case ACTIONS.SET_IMAGE_TAGS_IN_MAP:
      const { imageHash, tags } = payload;

      appStore.imageHashMap[imageHash].tags = tags;
      break;

    case ACTIONS.SET_IMAGE_TAGS_IN_COUNTER:
      console.log("about to set tags: ", payload);
      payload.tags.forEach((tag) => {
        let count = uiStore.tagCountMap[tag] ? uiStore.tagCountMap[tag] : 0;
        uiStore.tagCountMap[tag] = ++count;
      });

      break;

    case ACTIONS.SET_IMAGE_FILTER_TAG_SEARCH_VALUE:
      const searchValue = payload;

      uiStore.tagSearchValue = searchValue;

      const filteredImages = [];
      let found = 0; // only calculate the first 200 tag matches

      // TODO: refactor and clean up
      Object.keys(appStore.imageHashMap).some((key) => {
        const tags = appStore.imageHashMap[key].tags;
        if (searchValue === "") {
          filteredImages.push(appStore.imageHashMap[key]);

          found++;
        } else {
          if (
            tags &&
            tags.filter((tag) => tag.includes(searchValue)).length > 0
          ) {
            filteredImages.push(appStore.imageHashMap[key]);

            found++;
          }
        }

        if (found > 200) {
          return true;
        }
      });

      uiStore.filteredImageList = filteredImages;
      break;

    default:
      console.error(`${type} action has no reducer`);
  }
};

module.exports = {
  triggerAction,
  processor,
  ACTIONS,
  CONSTANTS,
  uiStore,
  appStore,
  initializeStore,
};
