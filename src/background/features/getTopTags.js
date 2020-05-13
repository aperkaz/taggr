/**
 * Pick top N tags from existing tag collection
 *
 * @param {Object} imageHashMap
 * @param {Number} maxNumberOfTags
 * @returns object list, as [{name: X, count: Y}]
 */
const getTopTags = async (imageHashMap, maxNumberOfTags) => {
  let tagCountMap = {};

  // iterate over all the images and return the ones with tag matches
  Object.keys(imageHashMap).forEach((key) => {
    const tags = imageHashMap[key].tags;

    // per eash tag, create count map
    tags.forEach((tag) => {
      if (!tagCountMap[tag]) {
        tagCountMap[tag] = { name: tag, count: 1 };
      } else {
        tagCountMap[tag].count++;
      }
    });
  });

  // flatten and order the count map
  const results = [];
  Object.keys(tagCountMap).forEach((key) => {
    const tagCountPair = tagCountMap[key];
    addOrderedDescendentByCount(results, tagCountPair);
  });

  return results.slice(0, maxNumberOfTags);
};

/**
 *
 * @param {Object[]} results
 * @param {TagCountPairType} tagCountPair
 * @typedef {Object} TagCountPairType
 * @property {string} name tag name
 * @property {number} count count of that tag in project
 */
const addOrderedDescendentByCount = (results, tagCountPair) => {
  let found = false;

  for (let i = 0; i < results.length; i++) {
    if (tagCountPair.count > results[i].count) {
      results.splice(i, 0, tagCountPair);
      found = true;
      break;
    }
  }

  if (!found) {
    results.push(tagCountPair);
  }
};

export default getTopTags;
