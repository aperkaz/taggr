const { ipcRenderer } = require("electron");
import logger from "electron-timber";

import IPC_CHANNELS from "../../shared/ipcChannels";
import { BACKGROUND_ACTIONS } from "../../shared/actions";

import store, { ACTIONS } from "../store";
import { sendToBackground } from "./utils";

/**
 * Trigger project creation in background process
 * @param {String} folderPath root folder path for the project
 */
export const createProject = (folderPath) => {
  sendToBackground({
    type: BACKGROUND_ACTIONS.CREATE_PROJECT,
    payload: folderPath,
  });
};

/**
 * Trigger project deletion in background process
 */
export const deleteProject = () => {
  sendToBackground({ type: BACKGROUND_ACTIONS.DELETE_PROJECT, payload: null });
};

/**
 * Trigger image search in background process
 * @param {String[]} tagValues
 */
export const searchImages = (tagValues) => {
  sendToBackground({
    type: BACKGROUND_ACTIONS.SEARCH_IMAGES,
    payload: tagValues,
  });
};

// Listener for incomming IPC messages
ipcRenderer.on(
  IPC_CHANNELS.MESSAGE_BUS,
  (event, { senderId, type, payload }) => {
    logger.log(
      `IPC: ${IPC_CHANNELS.MESSAGE_BUS} | from ${senderId} | type: ${type}`
    );

    switch (type) {
      case ACTIONS.setImages.type:
        store.dispatch(ACTIONS.setImages(payload));
        break;
      case ACTIONS.setImagesWithLocation.type:
        store.dispatch(ACTIONS.setImagesWithLocation(payload));
        break;
      case ACTIONS.setTask.type:
        store.dispatch(ACTIONS.setTask(payload));
        break;
      case ACTIONS.setTags.type:
        store.dispatch(ACTIONS.setTags(payload));
        break;
      case ACTIONS.resetState.type:
        store.dispatch(ACTIONS.resetState());
        break;
      default:
    }
  }
);

// TODO: clean up module dependency and simplify service layer
// TODO: improvement: rethink the dependencies betweem processes and service layer.
