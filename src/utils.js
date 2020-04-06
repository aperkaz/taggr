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
 * Recursively find all the picture paths inside a given folder
 *
 * @param {String} folderPath
 * @returns {Array} array of picture paths
 */
async function recursivelyFindPictures(folderPath) {
  const picturePathList = [];

  var settings = {
    // Filter files with js and json extension
    fileFilter: ["*.png", "*.PNG", "*.jpg", "*.JPG", ".*.jpeg", "*.JPEG"],
    // Filter by directory
    directoryFilter: ["!.git", "!*modules"],
  };

  for await (const entry of readdirp(folderPath, settings)) {
    const { path } = entry;
    picturePathList.push(`${folderPath}/${path}`);
  }

  return picturePathList;
}

/**
 * Populate picture map given an array of paths
 *
 * @param {Array} picturePathList
 * @returns {Object} map {picture1Hash: {path: picture1path, tags: []},...}
 */
function constructPictureMap(picturePathList) {
  const pictureMap = {};

  picturePathList.forEach((picturePath) => {
    console.log("analyzing pic: ", picturePath);
    const generatedHash = generateMD5FileHash(picturePath);
    console.log(generatedHash);
    console.log(".");
    pictureMap[generatedHash] = { path: picturePath, tags: [] };
  });

  return pictureMap;
}

module.exports = {
  generateMD5FileHash,
  recursivelyFindPictures,
  constructPictureMap,
};
