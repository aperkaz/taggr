const store = require("../store");

function initializeImageTaggingWorker() {
  const path = require("path");

  let imageTaggingWorker = new Worker(
    path.resolve(__dirname, "imageTagging.js")
  );

  imageTaggingWorker.onmessage = ({ data }) => {
    const { generateMD5Hash } = require("../utils");

    const imagePath = data.path;
    const imageTags = data.tags;
    const imageHash = generateMD5Hash(imagePath);

    store.imageHashMap[imageHash] = { path: imagePath, tags: imageTags };
  };
  return imageTaggingWorker;
}

module.exports = { initializeImageTaggingWorker };
