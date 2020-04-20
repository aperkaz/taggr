const ACTIONS = {
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",

  SET_ROOT_FOLDER_PATH: "SET_ROOT_FOLDER_PATH",

  CALCULATE_IMAGE_PATHS_IN_ROOT: "CALCULATE_IMAGE_PATHS_IN_ROOT",
  CALCULATE_IMAGE_TAGS: "CALCULATE_IMAGE_TAGS",

  SET_IMAGE_PATHS_IN_MAP: "SET_IMAGE_PATHS_IN_MAP",
  SET_IMAGE_TAGS_IN_MAP: "SET_IMAGE_TAGS_IN_MAP",

  SET_IMAGE_FILTER_TAG_SEARCH_VALUE: "SET_IMAGE_FILTER",
};

const CONSTANTS = {
  PAGES: {
    START_PAGE: "START_PAGE",
    DASHBOARD_PAGE: "DASHBOARD_PAGE",
  },
};

let uiStore = require("./uiStore");
let appStore = require("./appStore");
const createWorkers = require("../workers/index");
const { generateMD5Hash } = require("./utils");

// TODO: fix
let workers = { recursiveImageFinderWorker: {} };
// const setup = () => {
workers = createWorkers();
// };

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
  console.log(`P: ${type} : ${payload}`);

  switch (type) {
    case ACTIONS.SET_CURRENT_PAGE:
      uiStore.currentPage = payload;
      break;

    case ACTIONS.SET_ROOT_FOLDER_PATH:
      appStore.rootFolderPath = payload;
      break;

    case ACTIONS.CALCULATE_IMAGE_PATHS_IN_ROOT:
      // TODO: clean: use comlink to clean worker syntax

      // setup worker listener
      workers.recursiveImageFinderWorker.onmessage = ({ data }) => {
        triggerAction({
          type: ACTIONS.SET_IMAGE_PATHS_IN_MAP,
          payload: data.imagePathsList,
        });
      };

      // trigger worker
      workers.recursiveImageFinderWorker.postMessage({
        path: payload,
      });

      break;

    case ACTIONS.CALCULATE_IMAGE_TAGS:
      console.log("calculate image tags");
      break;

    case ACTIONS.SET_IMAGE_PATHS_IN_MAP:
      const imagePaths = payload;

      imagePaths.forEach((imagePath) => {
        const imageHash = generateMD5Hash(imagePath);

        appStore.imageHashMap[imageHash] = {
          path: imagePath,
          tags: null,
        };
      });
      break;

    case ACTIONS.SET_IMAGE_TAGS_IN_MAP:
      const { imageHash, tags } = payload;

      appStore.imageHashMap[imageHash] = {
        tags,
      };
      break;

    case ACTIONS.SET_IMAGE_FILTER_TAG_SEARCH_VALUE:
      const searchValue = payload;

      uiStore.tagSearchValue = searchValue;

      const filteredImages = [];
      let found = 0; // only calculate the first 15 tag matches

      Object.keys(appStore.imageHashMap).some((key) => {
        const tags = appStore.imageHashMap[key].tags;

        if (tags.filter((tag) => tag.includes(searchValue)).length > 0) {
          filteredImages.push(appStore.imageHashMap[key]);

          found++;
        }
        if (found > 15) {
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
};
