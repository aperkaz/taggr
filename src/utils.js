const fs = require("fs");
const crypto = require("crypto");
const readdirp = require("readdirp");
const { classifyImage } = require("./imageRecognition");

// TODO: add tests
/**
 * Generate md5 hash string
 *
 * @param {String} input
 */
function generateMD5Hash(input) {
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

/**
 * Populate an image map given an array of paths
 *
 * @param {Array} imagePathList
 * @returns {Object} map {image1Hash: {path: image1path, tags: []},...}
 */
async function constructImageTags(imageHashMap) {
  if (!imageHashMap || Object.keys(imageHashMap).length === 0) return {};

  // console.time("constructImageTags");

  for (var key of Object.keys(imageHashMap)) {
    const imagePath = imageHashMap[key].path;
    const tags = await classifyImage(imagePath);
    imageMap[key].tags = tags;
  }

  // await Promise.all(
  //   Object.keys(imageMap).map(async (key) => {
  //     const imagePath = imageMap[key].path;
  //     const tags = await classifyImage(imagePath);
  //     imageMap[key].tags = tags;
  //   })
  // );

  // console.timeEnd("constructImageTags");
  return imageHashMap;
}

module.exports = {
  generateMD5Hash,
  generateMD5FileHash,
  recursivelyFindImages,
  constructImageMap,
  constructImageTags,
};
