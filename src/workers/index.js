const createWorkers = () => {
  const path = require("path");

  const recursiveImageFinderWorker = new Worker(
    path.resolve(__dirname, "recursiveImageFinder.js")
  );

  const imageTaggingWorker = new Worker(
    path.resolve(__dirname, "imageTagging.js")
  );

  return {
    recursiveImageFinderWorker,
    imageTaggingWorker,
  };
};

module.exports = createWorkers;
