const Comlink = require("comlink");
const { findImagePathsInFolder } = require("../utils");

Comlink.expose({
  async process(path) {
    const imagePathsList = await findImagePathsInFolder(path);
    return imagePathsList;
  },
});
