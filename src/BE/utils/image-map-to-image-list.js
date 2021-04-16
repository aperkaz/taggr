/**
 * Transfrom the imageHashMap to imageList
 *
 * @param {ImageHashMapType|{}} imageHashMap
 * @returns {Object[]} imageList
 */
export default (imageHashMap) => {
  return Object.keys(imageHashMap).map((key) => ({
    ...imageHashMap[key],
  }));
};
