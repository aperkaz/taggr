const bytenode = require("bytenode");
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const readStats = promisify(fs.stat);

/**
 * Load image as Uint8Array.
 *
 * @param {string} path
 * @returns {Promise<Uint8Array>}
 */
const loadFileAsUint8Array = async (path) => {
  const image = await readFile(path);
  const buf = Buffer.from(image);
  return new Uint8Array(buf);
};

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
 * Load file stats from path.
 * @param {string} path
 */
const loadFilesystemStats = async (path) => {
  try {
    return await readStats(path);
  } catch (e) {
    // TODONOW: send error to sentry. File not found (likely removed after project creation)
    // console.log(e);
    return {};
  }
};

module.exports = {
  loadFileAsUint8Array,
  loadEXIFData,
  loadFilesystemStats,
};
