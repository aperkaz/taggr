const path = require("path");

export const createWorkers = (store) => {
  return;
  // TODONOW: fix
  // initializations
  console.log(path.resolve(__dirname));

  let imageTaggingWorker = new Worker("imageTagging.js");

  let recursiveImageFinderWorker = new Worker(
    path.resolve(__dirname, "recursiveImageFinder.js")
  );

  // callbacks
  imageTaggingWorker.onmessage = ({ data }) => {
    const { generateMD5Hash } = require("../utils");

    const imagePath = data.path;
    const imageTags = data.tags;
    const imageHash = generateMD5Hash(imagePath);

    console.log("imageTaggingWorker to update store");

    if (store.imageHashMap[imageHash]) {
      // update if existing
      store.imageHashMap[imageHash].tags = imageTags;
    } else {
      // initialize if non existing
      store.imageHashMap[imageHash] = { path: imagePath, tags: imageTags };
    }
  };

  recursiveImageFinderWorker.onmessage = ({ data }) => {
    store.imagePathsList = data.imagePathsList;
  };

  return { imageTaggingWorker, recursiveImageFinderWorker };
};

// module.exports = { createWorkers };
