const readdirp = require("readdirp");
// TODONOW: rethings event tracking
// const trackEventInProd =require( "../../../shared/trackEventInProd)";

/**
 * Recursively find all the image paths inside the folderPath
 *
 * @param {String} folderPath
 * @returns {Promise<String[]>} image paths list
 */
const recursivelyFindImages = async (folderPath) => {
  let imagePathsList = [];
  let projectSize = 0;

  var settings = {
    // Filter files with png and jpeg extension
    fileFilter: ["*.png", "*.PNG", "*.jpg", "*.JPG", "*.jpeg", "*.JPEG"],
    // Filter by directory
    directoryFilter: ["!.git", "!*modules", "!.cache", "!.*"],
    alwaysStat: true,
  };

  try {
    for await (const entry of readdirp(folderPath, settings)) {
      const {
        path,
        stats: { size },
      } = entry;

      // in windows, files read as bigint. in linux, as number
      const normalizedSize = typeof size === "bigint" ? Number(size) : size;
      projectSize += normalizedSize;

      imagePathsList.push(`${folderPath}/${path}`);
    }
  } catch (e) {
    // TODO: Sentry: send error.
    // Error reading folders
    console.log(e);
  }

  // TODONOW: add reporting again
  // trackEventInProd({
  //   category: "User Interaction",
  //   action: "Project created",
  //   label: "Image count",
  //   value: imagePathsList.length,
  // });

  // trackEventInProd({
  //   category: "User Interaction",
  //   action: "Project created",
  //   label: "Size (mb)",
  //   value: Math.round(projectSize / 1000000),
  // });

  return imagePathsList;
};

module.exports = { recursivelyFindImages };
