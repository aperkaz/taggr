/**
 * Touchpoint with the FE, through node-ipc
 */
const bytenode = require("bytenode");
const ipc = require("./helpers");

// @ts-ignore-next-line
require("../store/types");

/**
 * Update images in FE
 *
 * @param {{images: ImageType[], imagesWithLocation:ImageType[]}} images
 */
const updateImages = (images) => {
  ipc.send("update-images", images);
};

/**
 * Update task in FE
 *
 * @param {TaskType} task
 */
const updateTask = (task) => {
  ipc.send("update-task", task);
};

const resetState = () => {
  ipc.send("reset-state", null);
};

module.exports = {
  updateImages,
  updateTask,
  resetState,
};
