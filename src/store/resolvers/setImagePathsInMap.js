// TODONOW: add tests to resolvers
const setImagePathsInMap = (modules, payload) => {
  const { generateMD5Hash } = require("../../utils");

  payload.forEach((imagePath) => {
    const imageHash = generateMD5Hash(imagePath);

    modules.appStore.imageHashMap[imageHash] = {
      path: imagePath,
      hash: imageHash,
      tags: null,
    };
  });
};

module.exports = setImagePathsInMap;
