const Comlink = require("comlink");
const { getWorkers } = require("../../workers/index");
const { generateMD5Hash } = require("../../utils");

const createProject = async (modules, payload) => {
  const workers = getWorkers();

  // erase existing data (uiStore and appStore)
  modules.uiStore.tagSearchValue = "";
  modules.uiStore.filteredImageList = [];
  modules.uiStore.tagCountList = [];
  modules.appStore.projectRootFolderPath = "";
  modules.appStore.imageHashMap = {};

  console.log("clear existing project data");

  // set root foler
  modules.appStore.rootFolderPath = payload;

  // Worker: calculate all image paths in folder
  const imageFinderWorker = Comlink.wrap(workers.recursiveImageFinderWorker);
  let imagePathList = await imageFinderWorker.process(payload);

  console.log("calculate image paths in folder");

  // Worker: calculate tags for images
  const imageTaggingWorker = Comlink.wrap(workers.imageTaggingWorker);

  while (imagePathList.length > 0) {
    console.log("remaining: ", imagePathList.length);

    const imagePath = imagePathList.pop();
    const hash = generateMD5Hash(imagePath);

    const imageData = await generateImageData(imagePath);
    const tags = await imageTaggingWorker.process(imageData);

    // save results in appStore
    modules.appStore.imageHashMap[hash] = { path: imagePath, tags };
  }
};

/**
 * Load image using DOM Image element
 *
 * @param {String} path
 * @returns {Promise<HTMLImageElement>} loaded image
 */
async function loadImage(path) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = (err) => reject(err);
    img.onload = () => resolve(img);
    img.src = path;
  });
}

/**
 * Generate a ImageData structure from a imagePath
 *
 * @param {String} imagePath
 * @returns {Promise<ImageData>} loaded image
 */
const generateImageData = async (imagePath) => {
  // console.time("loadImage");
  let img = await loadImage(imagePath);
  // console.timeEnd("loadImage");

  let canvas = new OffscreenCanvas(img.width, img.height);
  canvas.getContext("2d").drawImage(img, 0, 0);

  const imageData = canvas
    .getContext("2d")
    .getImageData(0, 0, img.width, img.height);
  return imageData;
};

module.exports = createProject;
