import generateMD5Hash from "./generateMD5Hash";

/**
 * Generate main data structure from image path list
 * @param {string[]} imagePathList
 * @returns {Object} imageHashMap
 */
const generateImageHashMap = (imagePathList) => {
  const imageHashMap = {};

  imagePathList.forEach((imagePath) => {
    const hash = generateMD5Hash(imagePath);
    imageHashMap[hash] = { path: imagePath, tags: null };
  });

  return imageHashMap;
};

export default generateImageHashMap;
