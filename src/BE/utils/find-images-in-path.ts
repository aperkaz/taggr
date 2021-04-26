import readdirp from "readdirp";

import logFunctionPerf from "./log-function-perf";

import logger from "../../shared/logger";

// FIX: add event analytics
// const {
//   trackCreatedProjectImages,
//   trackCreatedProjectSize,
// } = require("../analytics/googleAnalytics");

/**
 * Recursively find all the image paths inside the folderPath
 */
async function recursivelyFindImages(folderPath: string): Promise<string[]> {
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

    // TODONOW: add tracking
    // trackCreatedProjectImages(imagePathsList.length);
    // trackCreatedProjectSize(Math.round(projectSize / 1000000));
  } catch (e) {
    logger.error(e);
  }

  return imagePathsList;
}

// @ts-ignore
export default logFunctionPerf(recursivelyFindImages);
