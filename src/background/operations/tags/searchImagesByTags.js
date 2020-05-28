/**
 * Return images containing set of tags
 * @param {ImageHashMapType} imageHashMap
 * @param {string[]} searchTags
 * @returns {ImageDataType[]}
 */
export const searchImagesByTags = (imageHashMap, searchTags) => {
  const results = [];

  // iterate over all the images and return the ones with tag matches
  Object.keys(imageHashMap).forEach((key) => {
    const imageTags = imageHashMap[key].tags;

    const containsAllSearchTags = searchTags.every((searchTag) =>
      imageTags.includes(searchTag)
    );

    if (containsAllSearchTags) {
      results.push(imageHashMap[key]);
    }
  });

  // console.log(results);

  return results;
};
