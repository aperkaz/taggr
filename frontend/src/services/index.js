/**
 * Available actions to execute over the backend.
 * Communication with message passing over node-ipc sockets.
 *
 * Background handlers: electron/src/server/server-handlers
 */
import { send } from "./helpers";
import "./handlers"; // registers handlers

// TODONOW: refactor to services/handler, like in BE. Out of the index.js

/**
 * Create a new taggr project
 * @param {Object} payload {projectRootFolderPath: string}
 */
export const serviceCreateProject = ({ projectRootFolderPath = "" }) => {
  send("create-project", { projectRootFolderPath });
};

/**
 * Filter images based on filter. The backend will send messages once the computation is complete.
 * @param {Object} filters {projectRootFolderPath: Object}
 */
export const serviceFilterImages = (filters) => {
  send("filter-images", filters);
};

/**
 * Delete existing taggr project. Stops processing if active.
 */
export const serviceDeleteProject = () => {
  send("delete-project", {});
};
