const fs = require("fs");
import crypto from "crypto";
const readdirp = require("readdirp");

/**
 * Generate md5 hash string
 *
 * @param {String} input
 */
export function generateMD5Hash(input) {
  return crypto.createHash("md5").update(input).digest("hex");
}

/**
 * Generate md5 hash from file
 *
 * @param {String} filePath
 */
function generateMD5FileHash(filePath) {
  let file_buffer = fs.readFileSync(filePath);
  return crypto.createHash("md5").update(file_buffer).digest("hex");
}

/**
 * Recursively find all the image paths inside a given folder
 *
 * @param {String} folderPath
 * @returns {Array} array of image paths
 */
async function recursivelyFindImages(folderPath) {
  // console.time("recursivelyFindImages");
  if (!folderPath) return [];

  const imagePathList = [];

  var settings = {
    // Filter files with js and json extension
    fileFilter: ["*.png", "*.PNG", "*.jpg", "*.JPG", ".*.jpeg", "*.JPEG"],
    // Filter by directory
    directoryFilter: ["!.git", "!*modules"],
  };

  for await (const entry of readdirp(folderPath, settings)) {
    const { path } = entry;
    imagePathList.push(`${folderPath}/${path}`);
  }

  // console.timeEnd("recursivelyFindImages");

  return imagePathList;
}

/**
 * Populate an image map given an array of paths
 *
 * @param {Array} imagePathList
 * @returns {Object} map {image1Hash: {path: image1path, tags: []},...}
 */
function constructImageMap(imagePathList) {
  if (!imagePathList) return {};

  // console.time("constructImageMap");
  const imageMap = {};

  imagePathList.forEach((imagePath) => {
    const generatedHash = generateMD5FileHash(imagePath);
    imageMap[generatedHash] = { path: imagePath, tags: [] };
  });

  // console.timeEnd("constructImageMap");
  return imageMap;
}

module.exports = {
  generateMD5Hash,
  generateMD5FileHash,
  constructImageMap,
  recursivelyFindImages,
};
