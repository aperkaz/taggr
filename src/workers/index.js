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

  recursiveImageFinderWorker.onmessage = ({ data }) => {
    actions.setImagePathsList(data.imagePathsList);
    actions.triggerImageTagsCalculation(data.imagePathsList);
  };

  let imageTaggingWorker = new ImageTaggingWorker();

  imageTaggingWorker.onmessage = ({ data }) => {
    actions.setImageTags(data.path, data.tags);
  };

  return { recursiveImageFinderWorker, imageTaggingWorker };
};
