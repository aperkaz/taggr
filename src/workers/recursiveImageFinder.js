const Comlink = require("comlink");
const { findImagePathsInFolder } = require("../store/utils");

Comlink.expose({
  async process(path) {
    const imagePathsList = await findImagePathsInFolder(path);
    return imagePathsList;
  },
});
