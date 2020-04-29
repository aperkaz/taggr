import RecursiveImageFinderWorker from "./recursiveImageFinder.worker.js";
import ImageTaggingWorker from "./imageTagging.worker.js";

let workers;

// TODONOW: review, do i really need this? Maybe I only need to create them manually in the resolvers
/**
 * Initialize web workers
 *
 * @returns {Object} workers
 */
export const initializeWorkers = () => {
  let recursiveImageFinderWorker = new RecursiveImageFinderWorker();

  let imageTaggingWorker = new ImageTaggingWorker();

  return { recursiveImageFinderWorker, imageTaggingWorker };
};

export const getWorkers = () => workers;
