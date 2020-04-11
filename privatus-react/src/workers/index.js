// const path = require("path");
// import TestWorkerScript from "./TestWorker";
// import imageTaggingScript from "./imageTagging";
import RecursiveImageFinderWorker from "./recursiveImageFinder.worker";

export const createWorkers = (state) => {
  // var myWorker = new Worker(TestWorkerScript);

  // myWorker.onmessage = (m) => {
  //   console.log("msg from worker: ", m.data);
  // };
  // myWorker.postMessage("im from main");

  let recursiveImageFinderWorker = new RecursiveImageFinderWorker();

  recursiveImageFinderWorker.onmessage = ({ data }) => {
    state.imagePathsList = data.imagePathsList;
  };

  return { recursiveImageFinderWorker };
  // TODONOW: fix
  // initializations
  // console.log(path.resolve(__dirname));

  // let imageTaggingWorker = new Worker("imageTagging.js");

  // let recursiveImageFinderWorker = new Worker(
  //   path.resolve(__dirname, "recursiveImageFinder.js")
  // );

  // // callbacks
  // imageTaggingWorker.onmessage = ({ data }) => {
  //   const { generateMD5Hash } = require("../utils");

  //   const imagePath = data.path;
  //   const imageTags = data.tags;
  //   const imageHash = generateMD5Hash(imagePath);

  //   console.log("imageTaggingWorker to update store");

  //   if (store.imageHashMap[imageHash]) {
  //     // update if existing
  //     store.imageHashMap[imageHash].tags = imageTags;
  //   } else {
  //     // initialize if non existing
  //     store.imageHashMap[imageHash] = { path: imagePath, tags: imageTags };
  //   }
  // };

  // recursiveImageFinderWorker.onmessage = ({ data }) => {
  //   store.imagePathsList = data.imagePathsList;
  // };

  // return { imageTaggingWorker, recursiveImageFinderWorker };
};

// module.exports = { createWorkers };
