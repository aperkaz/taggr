import logger from "electron-timber";
import IPC_CHANNELS from "../../shared/ipcChannels";
const { ipcRenderer } = require("electron");
import { sendToBackground } from "./utils";

import store, { setImages, setTask, setTags, resetState } from "../store";
import FLOWS from "../../background/flows";

/**
 * Trigger project creation in background process
 * @param {String} folderPath root folder path for the project
 */
export const createProject = (folderPath) => {
  sendToBackground({ type: FLOWS.CREATE_PROJECT, payload: folderPath });
};

/**
 * Trigger project deletion in background process
 */
export const deleteProject = () => {
  sendToBackground({ type: FLOWS.DELETE_PROJECT, payload: null });
};

/**
 * Trigger image search in background process
 * @param {String} tagValue partial value of image tag
 */
export const searchImages = (tagValue) => {
  sendToBackground({ type: FLOWS.SEARCH_IMAGES, payload: tagValue });
};

// Listener for incomming IPC messages
ipcRenderer.on(
  IPC_CHANNELS.MESSAGE_BUS,
  (event, { senderId, type, payload }) => {
    logger.log(
      `IPC: ${IPC_CHANNELS.MESSAGE_BUS} | from ${senderId} | type: ${type}`
    );

    switch (type) {
      case setImages.type:
        store.dispatch(setImages(payload));
        break;
      case setTask.type:
        store.dispatch(setTask(payload));
        break;
      case setTags.type:
        store.dispatch(setTags(payload));
        break;
      case resetState.type:
        store.dispatch(resetState());
        break;
      default:
    }
  }
);

// TODO: clean up module dependency and simplify service layer
// TODO: improvement: rethink the dependencies betweem processes and service layer.
