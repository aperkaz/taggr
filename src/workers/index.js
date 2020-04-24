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

  const filterResultsWorker = new Worker(
    path.resolve(__dirname, "filterResults.js")
  );

  const pickTopTagsWorker = new Worker(
    path.resolve(__dirname, "pickTopTags.js")
  );

  workers = {
    recursiveImageFinderWorker,
    imageTaggingWorker,
    filterResultsWorker,
    pickTopTagsWorker,
  };

  console.log("workers initialized", workers);
};

module.exports = { initializeWorkers, getWorkers };
