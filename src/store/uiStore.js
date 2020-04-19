const { store, autoEffect } = require("@risingstack/react-easy-state");

const { generateMD5Hash } = require("../utils");
const createWorkers = require("../workers/index");
const CONSTANTS = require("../constants");

let workers = createWorkers();

let uiStore = store({
  appStatus: CONSTANTS.APP_STATUS.DASHBOARD_PAGE, // ['START_PAGE', 'DASHBOARD_PAGE']
  rootFolderPath: "",
  imagePathsList: [],
  imageHashMap: {}, // {imageHash: {tags: [], path: String}}
  tagSearchValue: "",
  imageResults: [], // array of filteres results
});

autoEffect(() => console.log("rootFolderPath: ", uiStore.rootFolderPath));
autoEffect(() =>
  console.log("imagePathsList: ", uiStore.imagePathsList.length)
);

// ACTIONS

const setAppStatus = (status) => (uiStore.appStatus = status);

const setRootFolderPath = (path) => (uiStore.rootFolderPath = path);

const setImagePathsList = (list) => (uiStore.imagePathsList = list);

const triggerRecursiveImageFinding = (path) => {
  // setup worker listener

  workers.recursiveImageFinderWorker.onmessage = ({ data }) => {
    setImagePathsList(data.imagePathsList);
    triggerImageTagsCalculation(data.imagePathsList);
  };

  // trigger worker
  workers.recursiveImageFinderWorker.postMessage({
    path,
  });
};

// TODO: future: performance wise, make sure that using a queue approach is better https://github.com/OptimalBits/bull
const triggerImageTagsCalculation = async (imagePathsList) => {
  console.log("triggerImageTagsCalculation", imagePathsList.length);

  // setup worker listener
  workers.imageTaggingWorker.onmessage = ({ data }) => {
    setImageTags(data.path, data.tags);
  };

  // trigger worker
  imagePathsList.forEach(async (imagePath) => {
    workers.imageTaggingWorker.postMessage({
      path: imagePath,
    });
  });
};

const setImageTags = (imagePath, tags) => {
  console.log("setImageTags", `${imagePath}: ${tags}`);
  const imageHash = generateMD5Hash(imagePath);

  if (uiStore.imageHashMap[imageHash]) {
    // update if existing
    uiStore.imageHashMap[imageHash].tags = tags;
  } else {
    // initialize if non existing
    uiStore.imageHashMap[imageHash] = {
      hash: imageHash,
      path: imagePath,
      tags,
    };
  }
};

const actions = {
  setRootFolderPath,
  setAppStatus,
  triggerRecursiveImageFinding,
  triggerImageTagsCalculation,
};

module.exports = { uiStore, actions };
