// import { observable, observe } from "@nx-js/observer-util";
import { createWorkers } from "./workers/index";

import { store, autoEffect } from "@risingstack/react-easy-state";

// GLOBAL STATE, https://github.com/nx-js/observer-util
let state = store({
  appStatus: "START_PAGE", // ['START_PAGE', 'DASHBOARD_PAGE']
  rootFolderPath: null,
  imagePathsList: [],
  imageHashMap: {}, // {imageHash: {tags: [], path: String}}
  tagMap: {},
  tagSearchValue: "",
  imageResults: [], // array of filteres results
  workers: {},
});

autoEffect(() => console.log(state.appStatus));

// initialize store and workers
export const createStore = () => {
  state.workers = createWorkers(state);
  return store;
};

export default state;

// REACTIONS

// rootFolderPath changes and is defined => modify app state to DASHBOARD_PAGE
autoEffect(() => {
  console.log("react to rootFolderPath: modify app state");
  console.log(state.rootFolderPath);
  if (state.rootFolderPath) {
    state.appStatus = "DASHBOARD_PAGE";
  }
});

// // rootFolderPath changes => recursively calculate all the image paths inside
// observe(() => {
//   if (!state.workers || !state.workers.recursiveImageFinderWorker) return;

//   state.workers.recursiveImageFinderWorker.postMessage({
//     path: state.rootFolderPath,
//   });
// });

// // imagePathsList changes => recalculate tags for all images
// observe(() => {
//   if (!state.workers || !state.workers.imageTaggingWorker) return;

//   console.log("trigger imagePathList computation");
//   // TODO: can be optimized, only calculating the tags for the non existing pictures
//   state.imagePathsList.forEach((imagePath) => {
//     state.workers.imageTaggingWorker.postMessage({
//       path: imagePath,
//     });
//   });
// });

// // imageResults

// observe(() => {
//   console.log(state.tagSearchValue);
//   console.log(state.imageHashMap);
//   console.log("/");
// });

// module.exports = createStore;
