const generateMD5Hash = require("./generateMD5Hash");
const normalizeImageUrl = require("./normalizeImageUrl");

// const { isDev } = require("../../server");

/**
 * Generate main data structure from image path list
 * @param {string[]} imagePathList
 * @returns {ImageHashMapType|{}} imageHashMap
 */
const generateImageHashMap = (imagePathList) => {
  const imageHashMap = {};

  imagePathList.forEach((imagePath) => {
    const hash = generateMD5Hash(imagePath);
    imageHashMap[hash] = {
      hash,
      // Since the UI is loaded from the local server in dev, it cant load local assets. Hack for
      path: normalizeImageUrl(imagePath),
      rawPath: imagePath,
      tags: null,
      location: null,
    };
  });

  return imageHashMap;
};

module.exports = generateImageHashMap;
