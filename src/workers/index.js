import RecursiveImageFinderWorker from "./recursiveImageFinder.worker.js";
import ImageTaggingWorker from "./imageTagging.worker.js";

import { generateMD5Hash } from "../utils";

export const createWorkers = (state) => {
  let recursiveImageFinderWorker = new RecursiveImageFinderWorker();

  recursiveImageFinderWorker.onmessage = ({ data }) => {
    console.log(data);
    state.imagePathsList = data.imagePathsList;
  };

  // recursiveImageFinderWorker.postMessage({ path: "/home/alain/Downloads" });

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
