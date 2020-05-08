import logger from "electron-timber";
import { IPC_CHANNELS } from "../../shared";
const { ipcRenderer } = require("electron");
const { getGlobal } = require("electron").remote;

// initialize global reference to backgroundWindow
let backgroundWindow = getGlobal("backgroundWindow");
if (!backgroundWindow) {
  logger.error("backgroundWindow not found");
}

/**
 * Trigger project creation in background process through IPC.
 * @param {String} projectRootFolderPath
 */
export const createProject = (projectRootFolderPath) => {
  logger.log("service: createProject,", projectRootFolderPath);

  backgroundWindow.webContents.send(
    IPC_CHANNELS.CREATE_PROJECT,
    projectRootFolderPath
  );
};

ipcRenderer.on(IPC_CHANNELS.CREATE_PROJECT, (event, message) => {
  logger.log(`IPC: ${IPC_CHANNELS.CREATE_PROJECT} | ${message}`);
});
