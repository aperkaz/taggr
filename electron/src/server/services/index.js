const { send } = require("../server-ipc");
/**
 * The interface with the UI (React interface)
 */
const ipc = require("../server-ipc");

const serviceUpdateImages = (images) => {
  ipc.send("update-images", images);
};

module.exports = {
  serviceUpdateImages,
};
