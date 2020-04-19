const { store, autoEffect } = require("@risingstack/react-easy-state");

const { generateMD5Hash } = require("../utils");
const createWorkers = require("../workers/index");
const CONSTANTS = require("../constants");

let workers = createWorkers();

const defaultImages = [
  {
    hash: "1",
    path: "/home/alain/Downloads/test_pictures/foto_340.jpg",
    tags: ["cat", "dog"],
  },
  {
    hash: "3",
    path: "/home/alain/Downloads/test_pictures/foto_341.jpg",
    tags: ["cat", "dog"],
  },
];

let uiStore = store({
  appStatus: CONSTANTS.APP_STATUS.START_PAGE, // ['START_PAGE', 'DASHBOARD_PAGE']
  rootFolderPath: "",
  imagePathsList: [],
  imageHashMap: {}, // {imageHash: {tags: [], path: String}}
  tagSearchValue: "",
  filteredImageList: defaultImages, // array of filteres results
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
  const queuedImagePathsList = imagePathsList.slice();

  while (queuedImagePathsList.length > 0) {
    const imagePath = queuedImagePathsList.pop();

    console.time("loadImage");
    let img = await loadImage(imagePath);
    console.timeEnd("loadImage");

    let canvas = new OffscreenCanvas(img.width, img.height);
    canvas.getContext("2d").drawImage(img, 0, 0);

    const imageData = canvas
      .getContext("2d")
      .getImageData(0, 0, img.width, img.height);

    workers.imageTaggingWorker.postMessage({
      path: imagePath,
      data: imageData,
    });
  }

  // imagePathsList.forEach(async (imagePath) => {
  //   console.time("loadImage");
  //   let img = await loadImage(imagePath);
  //   console.timeEnd("loadImage");

  //   let canvas = new OffscreenCanvas(img.width, img.height);
  //   canvas.getContext("2d").drawImage(img, 0, 0);

  //   const imageData = canvas
  //     .getContext("2d")
  //     .getImageData(0, 0, img.width, img.height);

  //   workers.imageTaggingWorker.postMessage({
  //     path: imagePath,
  //     data: imageData,
  //   });

  //   img = null;
  //   canvas = null;
  // });
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
    uiStore.filteredImageList = defaultImages;
    return;
  }

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

// EXPERIMENT

const imagePath = "/home/alain/Desktop/a/0.jpg";

// const {
//   loadModel,
//   classifyImage,
// } = require("../workers/tfImageClassification");
// const tf = require("@tensorflow/tfjs-node");

async function loadImage(path) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = (err) => reject(err);
    img.onload = () => resolve(img);
    img.src = path;
  });
}

(async () => {
  try {
    // const net = await loadModel();
    // console.time("loadImage");
    // const img = await loadImage(imagePath);
    // console.timeEnd("loadImage");
    // const canvas = new OffscreenCanvas(img.width, img.height);
    // canvas.getContext("2d").drawImage(img, 0, 0);
    // const imageData = canvas
    //   .getContext("2d")
    //   .getImageData(0, 0, img.width, img.height);
    // workers.imageTaggingWorker.postMessage({
    //   data: imageData,
    //   // context: net,
    // });
    // workers.imageTaggingWorker.onmessage = ({ data }) => {
    //   console.log("hi bro", data);
    //   // setImageTags(data.path, data.tags);
    // };
  } catch (err) {
    console.log(err);
  }
})();

module.exports = { uiStore, actions };
