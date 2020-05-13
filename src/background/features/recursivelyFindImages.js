import readdirp from "readdirp";

/**
 * Recursively find all the image paths inside the folderPath
 *
 * @param {String} folderPath
 * @returns {Promise<String[]>} image paths list
 */
const recursivelyFindImages = async (folderPath) => {
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
};

export default recursivelyFindImages;
