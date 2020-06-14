/**
 * Available actions to execute over the backend.
 * Communication with message passing over node-ipc sockets.
 *
 * Background handlers: electron/src/server/server-handlers
 */
import { send } from "./helpers";
import "./handlers"; // registers handlers

/**
 * Create a new taggr project
 * @param {Object} payload {projectRootFolderPath: string}
 */
export const serviceCreateProject = ({ projectRootFolderPath = "" }) => {
  send("create-project", { projectRootFolderPath });
};

/**
 * Filter images based on filter. The backend will send messages once the computation is complete.
 * @param {Object} payload {projectRootFolderPath: Object}
 */
export const serviceFilterImages = ({ filter }) => {
  send("filter-images", { filter });
};

/**
 * Delete existing taggr project. Stops processing if active.
 */
export const serviceDeleteProject = () => {
  send("delete-project", {});
};
