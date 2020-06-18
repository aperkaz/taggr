require("bytenode");
const readdirp = require("readdirp");
const get = require("lodash.get");
const load = require("./load");
// TODONOW: rethings event tracking
// const trackEventInProd =require( "../../../shared/trackEventInProd)";

/**
 * Recursively find all the image paths inside the folderPath
 *
 * @param {String} folderPath
 * @returns {Promise<String[]>} image paths list
 */
async function recursivelyFindImages(folderPath) {
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
}

/**
 * Get file creation date in UNIX EPOCH
 *
 * @param {string} path
 * @returns {Promise<number|null>}
 */
async function getFileCreationDate(path) {
  const exifData = await load.loadEXIFData(path);
  const exifDateTimeOriginal = get(exifData, "exif.DateTimeOriginal", null);
  const exifCreateDate = get(exifData, "exif.CreateDate", null);
  const exifModifyDate = get(exifData, "image.ModifyDate", null);

  if (exifDateTimeOriginal) {
    return exifDateStringToDate(exifDateTimeOriginal);
  }

  if (exifCreateDate) {
    return exifDateStringToDate(exifCreateDate);
  }

  if (exifModifyDate) {
    return exifDateStringToDate(exifModifyDate);
  }

  const fsStats = await load.loadFilesystemStats(path);
  const birthtime = get(fsStats, "birthtime", null);
  // the birthtime can be epoch 0, then check the mtime
  if (birthtime && birthtime !== 0) return birthtime.getTime();

  const mtime = get(fsStats, "mtime", null);
  if (mtime && mtime !== 0) return mtime.getTime();

  return null;
}

/**
 * Transform string to UTC EPOCH time. Uses local timezone for conversion.
 *
 * @param {string} exifDateString ex. "2013:01:01 01:01:01"
 */
const exifDateStringToDate = (exifDateString) => {
  if (!exifDateString) return null;

  var str = exifDateString.split(" ");
  //get date part and replace ':' with '-'
  var dateStr = str[0].replace(/:/g, "-");
  //concat the strings (date and time part)
  var properDateStr = dateStr + " " + str[1];
  //pass to Date
  var date = new Date(properDateStr);
  return date.getTime();
};

module.exports = { recursivelyFindImages, getFileCreationDate };
