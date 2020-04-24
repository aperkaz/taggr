const Comlink = require("comlink");

Comlink.expose({
  async process(path) {
    return await findImagePathsInFolder(path);
  },
});

/**
 * Find all the paths of images recursively inside path
 *
 * @param {String} folderPath
 * @returns {Promise<String[]>} imagePathsList
 */
async function findImagePathsInFolder(folderPath) {
  const readdirp = require("readdirp");
  let imagePathsList = [];

  var settings = {
    // Filter files with js and json extension
    fileFilter: ["*.png", "*.PNG", "*.jpg", "*.JPG", ".*.jpeg", "*.JPEG"],
    // Filter by directory
    directoryFilter: ["!.git", "!*modules", "!.cache", "!.*"],
  };

  for await (const entry of readdirp(folderPath, settings)) {
    const { path } = entry;
    imagePathsList.push(`${folderPath}/${path}`);
  }

  return imagePathsList;
}
