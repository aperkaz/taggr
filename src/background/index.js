const { getGlobal } = require("electron").remote;
import { ipcRenderer } from "electron";
import { loadModel, classifyImage } from "./features/tfImageClassification";
import {
  generateImageData,
  recursivelyFindImages,
  generateMD5Hash,
} from "./utils";
import store from "./store";
import { setImages, setTask, setTags } from "../renderer/store";
import IPC_CHANNELS from "../shared/ipcChannels";
import throttle from "lodash.throttle";

const backgroundLogger = getGlobal("backgroundLogger");

// TODO: feature: add switch based on the action types: CREATE_PROJECT,
// TODO: improve: refactor and simplify. /features folder -> createProject(). Or extract store helper methods
ipcRenderer.on(IPC_CHANNELS.MESSAGE_BUS, async (event, message) => {
  const { senderId, type, payload } = message;

  backgroundLogger.log(
    `IPC: ${IPC_CHANNELS.MESSAGE_BUS} | from ${senderId} | type: ${type} | payload: ${payload}`
  );

  // initialize task visibility in rederer
  sendToRenderer({
    type: setTask.type,
    payload: {
      isOngoing: true,
      name: "Be patient, the robots are analysing your memories!",
      percentage: 0,
    },
  });

  // find images in project folder
  store.projectRootFolderPath = payload;
  let imagePathsToProcess = await recursivelyFindImages(payload);

  // generate data structure for all images
  imagePathsToProcess.forEach((imagePath) => {
    const hash = generateMD5Hash(imagePath);
    store.imageHashMap[hash] = { path: imagePath, tags: null };
  });

  sendToRenderer({
    type: setImages.type,
    payload: Object.keys(store.imageHashMap).map((key) => ({
      hash: key,
      tags: null,
      path: normalizeImageUrl(store.imageHashMap[key].path),
    })),
  });

  // compute tags for all images in the store
  let totalImagesToTag = imagePathsToProcess.length;
  let imagesTagged = 0;

  console.time("processImages");

  while (imagePathsToProcess.length > 0) {
    const imagePath = imagePathsToProcess.pop();

    const hash = generateMD5Hash(imagePath);
    const imageData = await generateImageData(imagePath);

    const tags = await classifyImage(imageData);

    store.imageHashMap[hash] = {
      ...store.imageHashMap[hash],
      tags: tags ? tags : [],
    };

    imagesTagged++;
    console.log(`Processing: ${imagesTagged} / ${totalImagesToTag}`);

    // update task status
    updateTaskStatus(setTask.type, {
      percentage: Math.floor((imagesTagged * 100) / totalImagesToTag),
    });
  }
  console.timeEnd("processImages");

  // calculate top 20 tags
  const topTags = await pickTopTags(store.imageHashMap, 20);
  // send tags to renderer
  sendToRenderer({
    type: setTags.type,
    payload: await pickTopTags(store.imageHashMap, 20),
  });

  // end task in renderer
  sendToRenderer({
    type: setTask.type,
    payload: {
      isOngoing: false,
    },
  });
});

const updateTaskStatus = throttle((type, payload) => {
  sendToRenderer({
    type,
    payload,
  });
}, 500);

/**
 * Send {senderId: X, type: ACTION.TYPE, payload: {}} to renderer process
 * @param {messageType} message
 */
const sendToRenderer = (message) => {
  const rendererWindow = getGlobal("rendererWindow");
  let {
    webContents: { id: backgroundWindowId },
  } = getGlobal("backgroundWindow");

  rendererWindow.webContents.send(IPC_CHANNELS.MESSAGE_BUS, {
    ...message,
    senderId: backgroundWindowId,
  });
};

// TODONOW: extract to utils/helpers
const normalizeImageUrl = (imagePath) => {
  const normalize = require("normalize-path");

  // fixes linux / windows compatibility
  const normalizedImagePath = normalize(imagePath);
  return normalizedImagePath.startsWith("http")
    ? normalizedImagePath
    : `file:///${normalizedImagePath}`;
};

/**
 * Pick top N tags from existing tag collection
 *
 * @param {Object} imageHashMap
 * @param {number} maxNumberOfTags
 * @returns object list, as [{name: X, count: Y}]
 */
const pickTopTags = async (imageHashMap, maxNumberOfTags) => {
  let tagCountMap = {};

  // iterate over all the images and return the ones with tag matches
  Object.keys(imageHashMap).forEach((key) => {
    const tags = imageHashMap[key].tags;

    // per eash tag, create count map
    tags.forEach((tag) => {
      if (!tagCountMap[tag]) {
        tagCountMap[tag] = { name: tag, count: 1 };
      } else {
        tagCountMap[tag].count++;
      }
    });
  });

  // flatten and order the count map
  const results = [];
  Object.keys(tagCountMap).forEach((key) => {
    const tagCountPair = tagCountMap[key];
    addOrderedDescendentByCount(results, tagCountPair);
  });

  return results.slice(0, maxNumberOfTags);
};

/**
 *
 * @param {Object[]} results
 * @param {TagCountPairType} tagCountPair
 * @typedef {Object} TagCountPairType
 * @property {string} name tag name
 * @property {number} count count of that tag in project
 */
const addOrderedDescendentByCount = (results, tagCountPair) => {
  let found = false;

  for (let i = 0; i < results.length; i++) {
    if (tagCountPair.count > results[i].count) {
      results.splice(i, 0, tagCountPair);
      found = true;
      break;
    }
  }

  if (!found) {
    results.push(tagCountPair);
  }
};

(async () => {
  await loadModel();
  backgroundLogger.log("ML model loaded");
})();

backgroundLogger.log("Background process started");
