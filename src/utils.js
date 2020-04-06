const fs = require("fs");
const crypto = require("crypto");
const readdirp = require("readdirp");

/**
 * Generate md5 hash from file
 *
 * @param {String} filePath
 */
function generateMD5FileHash(filePath) {
  let file_buffer = fs.readFileSync(filePath);
  let sum = crypto.createHash("md5");
  sum.update(file_buffer);
  return sum.digest("hex");
}

/**
 * Recursively find all the image paths inside a given folder
 *
 * @param {String} folderPath
 * @returns {Array} array of image paths
 */
async function recursivelyFindImages(folderPath) {
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

  return imagePathList;
}

/**
 * Populate an image map given an array of paths
 *
 * @param {Array} imagePathList
 * @returns {Object} map {image1Hash: {path: image1path, tags: []},...}
 */
function constructImageMap(imagePathList) {
  const imageMap = {};

  imagePathList.forEach((imagePath) => {
    console.log("analyzing pic: ", imagePath);
    const generatedHash = generateMD5FileHash(imagePath);
    console.log(generatedHash);
    console.log("----");
    imageMap[generatedHash] = { path: imagePath, tags: [] };
  });

  return imageMap;
}

function classifyImage(imagePath) {}

module.exports = {
  generateMD5FileHash,
  recursivelyFindImages: recursivelyFindImages,
  constructImageMap,
};
