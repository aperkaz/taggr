import logger from "electron-timber";
import IPC_CHANNELS from "../../shared/ipcChannels";
const { ipcRenderer } = require("electron");

import store, { setImages, setTask, setTags } from "../store";

/**
 * Trigger project creation in background process through IPC channel: CREATE_PROJECT
 * @param {String} projectRootFolderPath
 */
export const createProject = (projectRootFolderPath) => {
  logger.log("service: createProject,", projectRootFolderPath);

  sendToBackground({ type: "CREATE_PROJECT", payload: projectRootFolderPath });
};

/**
 * Send message to background process through IPC.
 * @param {messageType} message
 */
const sendToBackground = (message) => {
  const { getGlobal } = require("electron").remote;
  const backgroundWindow = getGlobal("backgroundWindow");
  let {
    webContents: { id: rendererWindowId },
  } = getGlobal("rendererWindow");

  backgroundWindow.webContents.send(IPC_CHANNELS.MESSAGE_BUS, {
    ...message,
    senderId: rendererWindowId,
  });
};

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
      default:
    }
  }
);
