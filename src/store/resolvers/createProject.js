const Comlink = require("comlink");
const filterResultsByTag = require("./filterResultsByTag");
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
  let imagePathListToProcess = await imageFinderWorker.process(payload);

  // save in appStore
  imagePathListToProcess.forEach((imagePath) => {
    const hash = generateMD5Hash(imagePath);
    modules.appStore.imageHashMap[hash] = { path: imagePath, tags: null };
  });

  console.log("calculate image paths in folder");

  // Set the initial images in dashboard, prior to calculating tags
  await filterResultsByTag(modules, "");

  // Worker: calculate tags for images
  const imageTaggingWorker = Comlink.wrap(workers.imageTaggingWorker);

  const imagesToProcess = imagePathListToProcess.length;

  while (imagePathListToProcess.length > 0) {
    const remaining = imagePathListToProcess.length;

    // update analysis status in uiStore
    modules.uiStore.tagProcessingStatus = `Processing ${remaining} / ${imagesToProcess}`;

    console.time("processImage");

    const imagePath = imagePathListToProcess.pop();
    const hash = generateMD5Hash(imagePath);
    const imageData = await generateImageData(imagePath);

    console.time("classify");
    const tags = await imageTaggingWorker.process(imageData);
    console.timeEnd("classify");

    // save results in appStore
    modules.appStore.imageHashMap[hash] = { path: imagePath, tags };

    console.timeEnd("processImage");
  }
  modules.uiStore.tagProcessingStatus = null;

  // Worker: Sort tags by occcurrence, pick top 10
  const pickTopTagsWorker = Comlink.wrap(workers.pickTopTagsWorker);
  const topTags = await pickTopTagsWorker.process(
    modules.appStore.imageHashMap,
    10
  );
  modules.uiStore.tagCountList = topTags;
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
 * Generate a ImageData structure from a imagePath. Prepocess using Canvas to algorithm input: 224px
 *
 * @param {String} imagePath
 * @returns {Promise<ImageData>} loaded image
 */
const generateImageData = async (imagePath) => {
  let img = await loadImage(imagePath);

  const MAX_HEIGHT = 224;

  // calculate new ratios for image size, based on MAX_HEIGHT
  if (img.height > MAX_HEIGHT) {
    img.width *= MAX_HEIGHT / img.height;
    img.height = MAX_HEIGHT;
  }

  let canvas = new OffscreenCanvas(img.width, img.height);
  var ctx = canvas.getContext("2d");
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, img.width, img.height);

  const imageData = canvas
    .getContext("2d")
    .getImageData(0, 0, img.width, img.height);
  return imageData;
};

module.exports = createProject;
