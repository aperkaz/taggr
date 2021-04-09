/**
 * Available actions to execute over the backend.
 * Communication with message passing over node-ipc sockets.
 *
 * Background handlers: electron/src/server/server-handlers
 */
import { send } from "./helpers";
import { BE_EVENTS } from "../IPC_EVENTS";
import "./handlers"; // registers handlers

/**
 * Create a new taggr project
 * @param {Object} payload {projectRootFolderPath: string}
 */
export const createProject = ({ projectRootFolderPath = "" }) => {
  send(BE_EVENTS.CREATE_PROJECT, { projectRootFolderPath });
};

/**
 * Filter images based on filter. The backend will send messages once the computation is complete.
 * @param {Object} filters {projectRootFolderPath: Object}
 */
export const filterImages = (filters) => {
  send(BE_EVENTS.FILTER_IMAGES, filters);
};

/**
 * Delete existing taggr project. Stops processing if active.
 */
export const deleteProject = () => {
  send(BE_EVENTS.DELETE_PROJECT, {});
};
