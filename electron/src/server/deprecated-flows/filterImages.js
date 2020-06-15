const { getImageHashMap } = require("../store");
const searchImagesByTags = require("../operations/tags/searchImagesByTags");

/**
 * Filter images
 * @param {Object} filters
 * @param {number|null} filters.fromDate
 * @param {number|null} filters.toDate
 * @param {string[]} filters.tags
 * @returns {Promise<Object[]>} images
 */
const filterImages = async ({ fromDate, toDate, tags: filterTags }) => {
  let matchingImages = [];
  const allImages = getImageHashMap();

  console.time("searchImages");

  Object.keys(allImages).forEach((key) => {
    const { date: imageDate, tags: imageTags } = allImages[key];

    if (
      isDateInRange({ date: imageDate, fromDate, toDate }) &&
      arrayContains(imageTags, filterTags)
    ) {
      matchingImages.push(allImages[key]);
    }
  });

  console.timeEnd("searchImages");

  return matchingImages;
};

// TODO: move to time helpers
/**
 * Determine if date is in range
 * @param {Object} args
 * @param {number|null} args.date
 * @param {number|null} args.fromDate
 * @param {number|null} args.toDate
 * @returns {boolean}
 */
const isDateInRange = ({ date, fromDate, toDate }) => {
  if (!date) {
    if (!fromDate && !toDate) {
      return true;
    }
  }

  if (!fromDate) {
    if (date <= toDate) {
      return true;
    }
  }

  if (!toDate) {
    if (fromDate <= date) {
      return true;
    }
  }

  if (fromDate <= date && date <= toDate) {
    return true;
  }

  return false;
};

// TODO: move to array operation helpers
/**
 * Check if array A contains all the elements of array B
 * @param {Object[]} arrayA
 * @param {Object[]} arrayB
 * @returns {boolean}
 */
const arrayContains = (arrayA, arrayB) => {
  if (arrayB.length === 0) return true;

  return arrayB.every((bItem) => arrayA.includes(bItem));
};

const filterImagesWithLocation = async (filters) => {
  let matchingImages = [];

  console.time("searchImages");
  // TODO: redo
  // const matchingImages = searchImagesByTags(getImageHashMap(), payload);
  console.timeEnd("searchImages");

  return matchingImages;
};

module.exports = { filterImages, filterImagesWithLocation };
