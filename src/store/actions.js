const Comlink = require("comlink");
let uiStore = require("./uiStore");
let appStore = require("./appStore");
const createWorkers = require("../workers/index");
const { generateMD5Hash } = require("./utils");

const ACTIONS = {
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",

  SET_ROOT_FOLDER_PATH: "SET_ROOT_FOLDER_PATH",

  CALCULATE_IMAGE_PATHS_IN_ROOT: "CALCULATE_IMAGE_PATHS_IN_ROOT",
  SET_IMAGE_PATHS_IN_MAP: "SET_IMAGE_PATHS_IN_MAP",

  CALCULATE_IMAGE_TAGS: "CALCULATE_IMAGE_TAGS",
  SET_IMAGE_TAGS_IN_MAP: "SET_IMAGE_TAGS_IN_MAP",

  SET_IMAGE_FILTER_TAG_SEARCH_VALUE: "SET_IMAGE_FILTER",
};

const CONSTANTS = {
  PAGES: {
    START_PAGE: "START_PAGE",
    DASHBOARD_PAGE: "DASHBOARD_PAGE",
  },
};

// TODO: fix. e2e fail as all is to be started at the same time. Load from App.js
// let workers = { recursiveImageFinderWorker: {} };
// const setup = () => {
let workers = createWorkers();
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
  console.log(`P: ${type} : ${JSON.stringify(payload)}`);

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
      };

      const { Queue } = require("./utils");
      const imageRenderingQueue = new Queue(queueExecutor);

      payload.forEach(
        async (imagePath) => await imageRenderingQueue.add(imagePath)
      );

      break;

    case ACTIONS.SET_IMAGE_TAGS_IN_MAP:
      const { imageHash, tags } = payload;

      appStore.imageHashMap[imageHash].tags = tags;
      break;

    case ACTIONS.SET_IMAGE_FILTER_TAG_SEARCH_VALUE:
      const searchValue = payload;

      uiStore.tagSearchValue = searchValue;

      const filteredImages = [];
      let found = 0; // only calculate the first 15 tag matches

      console.log(appStore.imageHashMap);

      Object.keys(appStore.imageHashMap).some((key) => {
        const tags = appStore.imageHashMap[key].tags;

        if (
          tags &&
          tags.filter((tag) => tag.includes(searchValue)).length > 0
        ) {
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

// TODONOW: extract to utils
async function loadImage(path) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = (err) => reject(err);
    img.onload = () => resolve(img);
    img.src = path;
  });
}

const queueExecutor = async (imagePath) => {
  console.log("EXECUTING: ", imagePath);
  console.time("loadImage");
  let img = await loadImage(imagePath);
  console.timeEnd("loadImage");

  let canvas = new OffscreenCanvas(img.width, img.height);
  canvas.getContext("2d").drawImage(img, 0, 0);

  let imageData = canvas
    .getContext("2d")
    .getImageData(0, 0, img.width, img.height);

  workers.imageTaggingWorker.postMessage({
    path: imagePath,
    data: imageData,
  });

  // clean up for garbage collector
  img = null;
  canvas = null;
  imageData = null;

  // set timeout to allow worker callback to be triggered: TODO: performance: consider returning all the calculations at once from the worker.
  await new Promise((r) => setTimeout(r, 200));
};

module.exports = {
  triggerAction,
  processor,
  ACTIONS,
  CONSTANTS,
  uiStore,
  appStore,
};
