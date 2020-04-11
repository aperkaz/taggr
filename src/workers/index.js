import ImageTaggingWorker from "./imageTagging.worker";
import RecursiveImageFinderWorker from "./recursiveImageFinder.worker";

import { generateMD5Hash } from "../utils";

// TODONOW: when bundled, the worker files can not be found
export const createWorkers = (state) => {
  // initialize
  let recursiveImageFinderWorker = new RecursiveImageFinderWorker();

  recursiveImageFinderWorker.onmessage = ({ data }) => {
    state.imagePathsList = data.imagePathsList;
  };

  // initialize
  let imageTaggingWorker = new ImageTaggingWorker();

  imageTaggingWorker.onmessage = ({ data }) => {
    const imagePath = data.path;
    const imageTags = data.tags;
    const imageHash = generateMD5Hash(imagePath);

    console.log("imageTaggingWorker to update state");

    if (state.imageHashMap[imageHash]) {
      // update if existing
      state.imageHashMap[imageHash].tags = imageTags;
    } else {
      // initialize if non existing
      state.imageHashMap[imageHash] = { path: imagePath, tags: imageTags };
    }
  };

  return { recursiveImageFinderWorker, imageTaggingWorker };
};
