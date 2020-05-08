const { getGlobal } = require("electron").remote;
import { ipcRenderer } from "electron";
import { loadModel, classifyImage } from "./features/tfImageClassification";
import {
  generateImageData,
  recursivelyFindImages,
  generateMD5Hash,
} from "./utils";
import store from "./store";

import { IPC_CHANNELS } from "../shared";

const backgroundLogger = getGlobal("backgroundLogger");

// get global reference to rendererWindow, for IPC communication
const rendererWindow = getGlobal("rendererWindow");
if (!rendererWindow) {
  backgroundLogger.error("rendererWindow not found");
}

// TODONOW: refactor and simplify. /features folder -> createProject(). Or extract store helper methods
ipcRenderer.on(
  IPC_CHANNELS.CREATE_PROJECT,
  async (event, projectRootFolderPath) => {
    backgroundLogger.log(
      `IPC: ${IPC_CHANNELS.CREATE_PROJECT} | ${projectRootFolderPath}`
    );

    store.projectRootFolderPath = projectRootFolderPath;

    let imagePathsToProcess = await recursivelyFindImages(
      projectRootFolderPath
    );

    // generate data structure for all images
    imagePathsToProcess.forEach((imagePath) => {
      const hash = generateMD5Hash(imagePath);
      store.imageHashMap[hash] = { path: imagePath, tags: null };
    });

    // compute tags for all images in the store
    let totalImagesToTag = imagePathsToProcess.length;
    let imagesTagged = 0;

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

    rendererWindow.webContents.send(
      IPC_CHANNELS.CREATE_PROJECT,
      `Project created successsfully, with ${totalImagesToTag} images`
    );
  }
);

(async () => {
  await loadModel();
  backgroundLogger.log("ML model loaded");
})();

backgroundLogger.log("Background process started");
