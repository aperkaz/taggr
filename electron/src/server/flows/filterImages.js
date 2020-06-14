const { getImageHashMap } = require("../store");
const searchImagesByTags = require("../operations/tags/searchImagesByTags");

/**
 * TODO: extract to types
//  * @type {FiltersType}
//  *
//  * @typedef {Object} FiltersType
//  * @property {Date} fromDate
//  * @property {Date} toDate
//  * @property {string[]} tags
//  *
//  * @param {FiltersType} filters
 * @returns {Promise<Object[]>} images
 */
const filterImages = async (filters) => {
  let matchingImages = [];

  console.time("searchImages");
  // TODO: redo
  // const matchingImages = searchImagesByTags(getImageHashMap(), payload);
  console.timeEnd("searchImages");

  return matchingImages;
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
