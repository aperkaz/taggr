import get from "lodash.get";
import logger from "../../shared/logger";

/**
 * Load EXIF data from path.
 * @param {string} path
 */
const loadEXIFData = (path) => {
  var ExifImage = require("exif").ExifImage;

  return new Promise((resolve) => {
    new ExifImage(path, (err, data) => {
      resolve(data);
    });
  });
};

/**
 * Translate latlong string to {lat, lon} object
 * @param {string} latLongString
 */
const toDecimal = (latLongString) => {
  var parseDMS = require("parse-dms");

  return parseDMS(latLongString);
};

/**
 * Get the location info for an image
 * @param {string} imagePath without file:// prefix
 * @returns {Promise<{latitude: number, longitude: number}>}
 */
export const getLocation = async function (imagePath) {
  try {
    let exifData = await loadEXIFData(imagePath);

    // check if gps is contained
    const latitude = get(exifData, "gps.GPSLatitude", null);
    const longitude = get(exifData, "gps.GPSLongitude", null);

    if (!latitude || !longitude) return { latitude: null, longitude: null };

    const latDMS = exifData.gps.GPSLatitude;
    const longDMS = exifData.gps.GPSLongitude;

    const geoString = `${get(exifData, "gps.GPSLatitudeRef", "")}${
      latDMS[0]
    }° ${latDMS[1]}' ${latDMS[2]}" ${get(exifData, "gps.GPSLongitudeRef", "")}${
      longDMS[0]
    }° ${longDMS[1]}' ${longDMS[2]}"`;

    const { lat, lon } = toDecimal(geoString);

    return { latitude: lat, longitude: lon };
  } catch (e) {
    logger.error(e);
  }

  return { latitude: null, longitude: null };
};

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

/**
 * Get file creation date in UNIX EPOCH
 *
 * @param {string} path
 * @returns {Promise<number|null>}
 */
export const getFileCreationDate = async (path) => {
  const exifData = await loadEXIFData(path);
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
};
