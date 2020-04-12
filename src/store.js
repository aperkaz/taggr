import { store, autoEffect } from "@risingstack/react-easy-state";
import { createWorkers } from "./workers/index";

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

// TODO: add actions (execute mutations and sideeffects),instead of reactions

// REACTIONS

// rootFolderPath changes and is defined => modify app state to DASHBOARD_PAGE
autoEffect(() => {
  console.log("react to rootFolderPath: modify app state");
  console.log(state.rootFolderPath);
  if (state.rootFolderPath) {
    state.appStatus = "DASHBOARD_PAGE";
  }
});

// rootFolderPath changes => recursively calculate all the image paths inside
autoEffect(() => {
  if (!state.workers || !state.workers.recursiveImageFinderWorker) return;

  state.workers.recursiveImageFinderWorker.postMessage({
    path: state.rootFolderPath,
  });
});

// imagePathsList changes => recalculate tags for all images
autoEffect(() => {
  if (!state.workers || !state.workers.imageTaggingWorker) return;

  console.log("trigger imagePathList computation");
  console.log(state.imagePathsList);
  // TODO: can be optimized, only calculating the tags for the non existing pictures
  state.imagePathsList.forEach((imagePath) => {
    state.workers.imageTaggingWorker.postMessage({
      path: imagePath,
    });
  });
});

autoEffect(() => {
  console.log(state.imageHashMap);
  console.log("/");
});
