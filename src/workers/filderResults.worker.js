const Comlink = require("comlink");

Comlink.expose({
  async process(imageHashMap, tagSearchValue) {
    const results = [];

    console.log("filtering results");

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

    return results;
  },
});
