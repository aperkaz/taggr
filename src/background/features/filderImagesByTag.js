import store from "../store";

const filterImagesByTag = (tagSearchValue) => {
  const results = [];

  // iterate over all the images and return the ones with tag matches
  Object.keys(store.imageHashMap).some((key) => {
    const tags = store.imageHashMap[key].tags;
    if (tagSearchValue === "") {
      results.push(store.imageHashMap[key]);
    } else {
      if (
        tags &&
        tags.filter((tag) => tag.includes(tagSearchValue)).length > 0
      ) {
        results.push(store.imageHashMap[key]);
      }
    }
  });

  return results;
};

export default filterImagesByTag;
