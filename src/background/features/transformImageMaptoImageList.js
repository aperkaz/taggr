import normalizeImageUrl from "./normalizeImageUrl";

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
    // TODO: improvement: normaly as the first step, recursivelyFindImages
    path: normalizeImageUrl(imageHashMap[key].path),
  }));
}

export default transformImageMaptoImageList;
