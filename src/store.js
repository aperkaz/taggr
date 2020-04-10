const { observable, observe } = require("@nx-js/observer-util");

// TODO: initialize the workers as part of initializing the state

// GLOBAL STATE, https://github.com/nx-js/observer-util
let store = observable({
  appStatus: "START_PAGE", // ['START_PAGE', 'DASHBOARD_PAGE']
  rootFolderPath: null,
  imagePathsList: [],
  imageHashMap: {},
  tagSeachInputPlaceholder: "type tags: dog, cat, car...",
  tagSearchValue: "",
  workers: {},
});

// REACTIONS

// rootFolderPath changes and is defined => modify app state to DASHBOARD_PAGE
observe(() => {
  console.log("react to rootFolderPath: modify app state");
  console.log(store.rootFolderPath);
  if (store.rootFolderPath) {
    store.appStatus = "DASHBOARD_PAGE";
  }
});

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

observe(() => {
  console.log(store.tagSearchValue);
});

module.exports = store;
