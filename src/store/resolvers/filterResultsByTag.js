const filterResultsByTag = (modules, payload) => {
  // TODONOW: refactor for cleaner
  const searchValue = payload;

  modules.uiStore.tagSearchValue = searchValue;

  const filteredImages = [];
  let found = 0; // only calculate the first 200 tag matches

  // TODO: refactor and clean up
  Object.keys(modules.appStore.imageHashMap).some((key) => {
    const tags = modules.appStore.imageHashMap[key].tags;
    if (searchValue === "") {
      filteredImages.push(modules.appStore.imageHashMap[key]);

      found++;
    } else {
      if (tags && tags.filter((tag) => tag.includes(searchValue)).length > 0) {
        filteredImages.push(modules.appStore.imageHashMap[key]);

        found++;
      }
    }

    if (found > 200) {
      return true;
    }
  });

  modules.uiStore.filteredImageList = filteredImages;

  // query the existing data with the resutls
};

module.exports = filterResultsByTag;
