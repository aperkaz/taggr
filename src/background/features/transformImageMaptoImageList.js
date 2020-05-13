/**
 * Transfrom the imageHashMap to imageList
 *
 * @param {Object} imageHashMap
 * @returns {Object[]} imageList
 */
function transformImageMaptoImageList(imageHashMap) {
  return Object.keys(imageHashMap).map((key) => ({
    hash: imageHashMap[key].hash,
    tags: imageHashMap[key].tags,
    path: imageHashMap[key].path,
  }));
}

export default transformImageMaptoImageList;
