const { store, autoEffect } = require("@risingstack/react-easy-state");

const imageList = require("../../stories/mocks/imageList");

const { generateMD5Hash } = require("../utils");
const createWorkers = require("../workers/index");
const CONSTANTS = require("../constants");

let workers = createWorkers();

let uiStore = store({
  appStatus: CONSTANTS.APP_STATUS.START_PAGE, // ['START_PAGE', 'DASHBOARD_PAGE']
  rootFolderPath: "",
  imagePathsList: [],
  imageHashMap: {}, // {imageHash: {tags: [], path: String}}
  tagSearchValue: "",
  // filteredImageList: [], // array of filteres results
  filteredImageList: [
    {
      hash: "1",
      path: "file:///home/alain/Downloads/test_pictures/foto_340.jpg",
      tags: ["cat", "dog"],
    },
    {
      hash: "3",
      path: "file:////home/alain/Downloads/test_pictures/foto_341.jpg",
      tags: ["cat", "dog"],
    },
  ], // array of filteres results
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

const setTagSearchValue = (searchValue) => {
  console.log("setTagSearchValue: ", searchValue);
  uiStore.tagSearchValue = searchValue;

  if (searchValue === "") {
    // TODONOW: calculate default values and store in variable, not mock
    uiStore.filteredImageList = imageList;
    return;
  }

  // TODONOW: recalculate images to show, using AppStore
  const filteredImages = [];
  let found = 0; // only calculate the first 15 tag matches

  Object.keys(uiStore.imageHashMap).some((key) => {
    const tags = uiStore.imageHashMap[key].tags;

    if (tags.filter((tag) => tag.includes(searchValue)).length > 0) {
      filteredImages.push(uiStore.imageHashMap[key]);

      found++;
    }
    if (found > 15) {
      return true;
    }
  });

  console.log(filteredImages.length);

  uiStore.filteredImageList = filteredImages;
};

const actions = {
  setRootFolderPath,
  setAppStatus,
  triggerRecursiveImageFinding,
  triggerImageTagsCalculation,
  setTagSearchValue,
};

module.exports = { uiStore, actions };
