import RecursiveImageFinderWorker from "./recursiveImageFinder.worker.js";
import ImageTaggingWorker from "./imageTagging.worker.js";

/**
 * Initialize web workers
 *
 * @param {Object} actions - store actions
 * @returns {Object} workers
 */
export const initializeWorkers = (actions) => {
  let recursiveImageFinderWorker = new RecursiveImageFinderWorker();

  let imageTaggingWorker = new ImageTaggingWorker();

  return { recursiveImageFinderWorker, imageTaggingWorker };
};

// import RecursiveImageFinderWorker from "./recursiveImageFinder.worker.js";
// import ImageTaggingWorker from "./imageTagging.worker.js";
// import FilterResultsWorker from "./filterResults.worker.js";

// let workers;

// // expose through getter
// export const getWorkers = () => workers;

// export const initializeWorkers = () => {
//   // const path = require("path");

//   const recursiveImageFinderWorker = new RecursiveImageFinderWorker();

//   // const imageTaggingWorker = new ImageTaggingWorker();

//   // const filterResultsWorker = new Worker(
//   //   path.resolve(__dirname, "filterResults.js")
//   // );

//   // TODONOW: complete
//   // const pickTopTagsWorker = new Worker(
//   //   path.resolve(__dirname, "pickTopTags.js")
//   // );

//   workers = {
//     recursiveImageFinderWorker,
//     // imageTaggingWorker,
//     // filterResultsWorker,
//     // pickTopTagsWorker,
//   };

//   console.log("workers initialized", workers);
// };
