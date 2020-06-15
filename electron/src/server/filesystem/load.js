const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

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

module.exports = {
  loadFileAsUint8Array,
  loadEXIFData,
};
