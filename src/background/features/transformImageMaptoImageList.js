/**
 * Transfrom the imageHashMap to imageList
 *
 * @param {Object} imageHashMap
 * @returns {Object[]} imageList
 */
function transformImageMaptoImageList(imageHashMap) {
  return Object.keys(imageHashMap).map((key) => ({
    ...imageHashMap[key],
  }));
}

export default transformImageMaptoImageList;
