const { observable, observe } = require("@nx-js/observer-util");
const workers = require("./workers/index");

// GLOBAL STATE, https://github.com/nx-js/observer-util
let store = observable({
  appStatus: "OPEN", // ['OPEN', 'READY']
  rootFolderPath: "default",
  imagePathsList: [],
  imageHashMap: {},
  workers: {},
});

// REACTIONS

// rootFolderPath changes => recursively calculate all the image paths inside
observe(() => {
  if (!store.workers || !store.workers.recursiveImageFinderWorker) return;

  store.workers.recursiveImageFinderWorker.postMessage({
    path: store.rootFolderPath,
  });
});

// imagePathsList changes => recalculate tags for all images
observe(() => {
  if (!store.workers || !store.workers.imageTaggingWorker) return;

  console.log("trigger imagePathList computation");
  // TODO: can be optimized, only calculating the tags for the non existing pictures
  store.imagePathsList.forEach((imagePath) => {
    store.workers.imageTaggingWorker.postMessage({
      path: imagePath,
    });
  });
});

module.exports = store;
