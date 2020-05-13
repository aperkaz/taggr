import generateMD5Hash from "./generateMD5Hash";
import normalizeImageUrl from "./normalizeImageUrl";

/**
 * Generate main data structure from image path list
 * @param {string[]} imagePathList
 * @returns {Object} imageHashMap
 */
const generateImageHashMap = (imagePathList) => {
  const imageHashMap = {};

  imagePathList.forEach((imagePath) => {
    const hash = generateMD5Hash(imagePath);
    imageHashMap[hash] = { path: normalizeImageUrl(imagePath), tags: null };
  });

  return imageHashMap;
};

export default generateImageHashMap;
