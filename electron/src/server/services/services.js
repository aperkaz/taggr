/**
 * Touchpoint with the FE, through node-ipc
 */
const { FE_EVENTS } = require("../../IPC_EVENTS");
const ipc = require("./helpers");

// @ts-ignore-next-line
require("../store/types");

/**
 * Update images in FE
 *
 * @param {{images: ImageType[], imagesWithLocation:ImageType[]}} images
 */
const updateImages = (images) => {
  ipc.send(FE_EVENTS.UPDATE_IMAGES, images);
};

/**
 * Update task in FE
 *
 * @param {TaskType} task
 */
const updateTask = (task) => {
  ipc.send(FE_EVENTS.UPDATE_TASK, task);
};

const setRoute = (route) => {
  ipc.send(FE_EVENTS.SET_ROUTE, route);
};

const resetState = () => {
  ipc.send(FE_EVENTS.RESET_STATE, null);
};

module.exports = {
  updateImages,
  updateTask,
  setRoute,
  resetState,
};
