const { getGlobal } = require("electron").remote;

import { ipcRenderer } from "electron";
import { loadModel, classifyImage } from "./features/tfImageClassification";
import {
  generateImageData,
  recursivelyFindImages,
  generateMD5Hash,
} from "./utils";
import store from "./store";
import { setImages } from "../renderer/store";
import IPC_CHANNELS from "../shared/ipcChannels";

const backgroundLogger = getGlobal("backgroundLogger");

// get global reference to rendererWindow, for IPC communication
const rendererWindow = getGlobal("rendererWindow");
if (!rendererWindow) {
  backgroundLogger.error("rendererWindow not found");
}

// TODONOW: refactor and simplify. /features folder -> createProject(). Or extract store helper methods
ipcRenderer.on(IPC_CHANNELS.MESSAGE_BUS, async (event, message) => {
  const { senderId, type, payload } = message;

  backgroundLogger.log(
    `IPC: ${IPC_CHANNELS.MESSAGE_BUS} | from ${senderId} | type: ${type} | payload: ${payload}`
  );

  // TODONOW: add switch based on the action types: CREATE_PROJECT,

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
      tags: store.imageHashMap[key].tags,
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
  }
  console.timeEnd("processImages");

  sendToRenderer({
    type: "",
    payload: `Project created successsfully, with ${totalImagesToTag} images`,
  });
});

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

(async () => {
  await loadModel();
  backgroundLogger.log("ML model loaded");
})();

backgroundLogger.log("Background process started");
