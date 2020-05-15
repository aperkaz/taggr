import { getImageHashMap } from "../store";
import { sendToRenderer } from "../services/utils";

import { setImages } from "../../renderer/store";

const searchImages = async (payload) => {
  console.time("searchImages");
  const matchingImages = getImagesByTag(getImageHashMap(), payload);
  console.timeEnd("searchImages");

  sendToRenderer({ type: setImages.type, payload: matchingImages });
};

const getImagesByTag = (imageHashMap, tagSearchValue) => {
  const results = [];

  // iterate over all the images and return the ones with tag matches
  Object.keys(imageHashMap).some((key) => {
    const tags = imageHashMap[key].tags;
    if (tagSearchValue === "") {
      results.push(imageHashMap[key]);
    } else {
      if (
        tags &&
        tags.filter((tag) => tag.includes(tagSearchValue)).length > 0
      ) {
        results.push(imageHashMap[key]);
      }
    }
  });

  console.log(results);

  return results;
};

export default searchImages;
