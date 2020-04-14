import RecursiveImageFinderWorker from "./recursiveImageFinder.worker.js";
import ImageTaggingWorker from "./imageTagging.worker.js";

/**
 * Initialize web workers
 *
 * @param {Object} actions - store actions
 * @returns {Object} workers
 */
export const createWorkers = (actions) => {
  let recursiveImageFinderWorker = new RecursiveImageFinderWorker();

  let imageTaggingWorker = new ImageTaggingWorker();

  return { recursiveImageFinderWorker, imageTaggingWorker };
};
