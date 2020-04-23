const setImageTagsInCounter = (modules, payload) => {
  console.log("about to set tags: ", payload);
  payload.tags.forEach((tag) => {
    let count = modules.uiStore.tagCountMap[tag]
      ? modules.uiStore.tagCountMap[tag]
      : 0;
    modules.uiStore.tagCountMap[tag] = ++count;

    //check if tag is already present in results array
    const isTagBeingCounted = modules.uiStore.tagCountList.some(
      (tagCount, index) => {
        if (tagCount.name === tag) {
          modules.uiStore.tagCountList[index].count++;
          return true;
        }
      }
    );

    if (!isTagBeingCounted) {
      // if tag is not present in result array, add
      modules.uiStore.tagCountList.push({ name: tag, count: 1 });
    }
  });
};

module.exports = setImageTagsInCounter;
