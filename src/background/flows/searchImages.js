import { getImageHashMap } from "../store";
import { sendToRenderer } from "../services/utils";

import { setImages } from "../../renderer/store";

const searchImages = async (payload) => {
  console.time("searchImages");
  const matchingImages = getImagesByTag(getImageHashMap(), payload);
  console.timeEnd("searchImages");

  sendToRenderer({ type: setImages.type, payload: matchingImages });
};

/**
 *
 * @param {Object} imageHashMap
 * @param {string[]} searchTags
 */
const getImagesByTag = (imageHashMap, searchTags) => {
  console.log("searchTags: ", searchTags);

  const results = [];

  // iterate over all the images and return the ones with tag matches
  Object.keys(imageHashMap).some((key) => {
    const imageTags = imageHashMap[key].tags;
    if (searchTags.length === 0) {
      results.push(imageHashMap[key]);
    } else {
      // Search for all the tags in one image

      // TODONOW: add test, and test that multiple searchTags in one  picture work.
      searchTags.some((searchTag) => {
        if (
          imageTags &&
          imageTags.filter((tag) => tag.includes(searchTag)).length > 0
        ) {
          results.push(imageHashMap[key]);
          return true;
        }
      });
    }
  });

  console.log(results);

  return results;
};

export default searchImages;
