// The interface with the UI (React interface)
const ipc = require("./helpers");

// TODO: improvement: add naming to all services. Research online.
const serviceUpdateImages = (images) => {
  ipc.send("update-images", images);
};

const serviceUpdateImagesWithLocation = (imagesWithLocation) => {
  ipc.send("update-images-with-location");
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
