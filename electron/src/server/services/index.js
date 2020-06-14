// The interface with the UI (React interface)
const ipc = require("./helpers");

const serviceUpdateImages = (images) => {
  ipc.send("update-images", images);
};

const serviceUpdateImagesWithLocation = (imagesWithLocation) => {
  ipc.send("update-images-with-location", imagesWithLocation);
};

const serviceUpdateTask = (task) => {
  ipc.send("update-task", task);
};

const serviceResetState = () => {
  ipc.send("reset-state", null);
};

module.exports = {
  serviceUpdateImages,
  serviceUpdateImagesWithLocation,
  serviceUpdateTask,
  serviceResetState,
};
