let workers;

// expose through getter
const getWorkers = () => workers;

const initializeWorkers = () => {
  const path = require("path");

  const recursiveImageFinderWorker = new Worker(
    path.resolve(__dirname, "recursiveImageFinder.js")
  );

  const imageTaggingWorker = new Worker(
    path.resolve(__dirname, "imageTagging.js")
  );

  workers = {
    recursiveImageFinderWorker,
    imageTaggingWorker,
  };

  console.log("workers initialized", workers);
};

module.exports = { initializeWorkers, getWorkers };
