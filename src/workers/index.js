function initializeWorkers(store) {
  const path = require("path");

  // initializations
  let imageTaggingWorker = new Worker(
    path.resolve(__dirname, "imageTagging.js")
  );

  let recursiveImageFinderWorker = new Worker(
    path.resolve(__dirname, "recursiveImageFinder.js")
  );

  // callbacks
  imageTaggingWorker.onmessage = ({ data }) => {
    const { generateMD5Hash } = require("../utils");

    const imagePath = data.path;
    const imageTags = data.tags;
    const imageHash = generateMD5Hash(imagePath);

    if (store.imageHashMap[imageHash]) {
      // update if existing
      store.imageHashMap[imageHash].tags = imageTags;
    } else {
      // initialize if non existing
      store.imageHashMap[imageHash] = { path: imagePath, tags: imageTags };
    }
  };

  recursiveImageFinderWorker.onmessage = ({ data }) => {
    console.log("recursiveImageFinderWorker post message");
    // console.log(store);
    // console.log(store.imagePathsList);
    store.imagePathsList = data.imagePathsList;
  };

  return { imageTaggingWorker, recursiveImageFinderWorker };
}

module.exports = { initializeWorkers };
