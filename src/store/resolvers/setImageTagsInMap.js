const setImageTagsInMap = (modules, payload) => {
  const { imageHash, tags } = payload;

  modules.appStore.imageHashMap[imageHash].tags = tags;
};

module.exports = setImageTagsInMap;
