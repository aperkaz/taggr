/**
 * Filter images
 */
const filterImages = (imageMap, filters) => {
  let images = [];
  let imagesWithLocation = [];

  // All images
  Object.keys(imageMap).forEach((key) => {
    const image = imageMap[key];
    if (filterImage(image, filters)) {
      images.push(image);
    }
  });

  // Images with location
  Object.keys(imageMap).forEach((key) => {
    const image = imageMap[key];

    if (filterImage(image, filters)) {
      imagesWithLocation.push(image);
    }
  });

  return { images, imagesWithLocation };
};

/**
 * @param {ImageType} image
 * @param {FilterType} filters
 * @returns {boolean}
 */
const filterImage = (image, filters) => {
  const { fromDate, toDate, tags: filterTags } = filters;
  const { creationDate, tags: imageTags } = image;

  return (
    isDateInRange({ date: creationDate, fromDate, toDate }) &&
    arrayContains(imageTags, filterTags)
  );
};

/**
 * Determine if date is in range
 * Dates in UNIX EPOCH format
 *
 * @param {Object} args
 * @param {number|null} args.date
 * @param {number|null} args.fromDate
 * @param {number|null} args.toDate
 * @returns {boolean}
 */
const isDateInRange = ({ date, fromDate, toDate }) => {
  if (!date && date !== 0) {
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

// TODONOW: add unit test to the filters

module.exports = { filterImages, isDateInRange };
