import * as tf from "@tensorflow/tfjs";

import store from "./index";
import { generateMD5Hash } from "../../utils";

const mobilenet = require("@tensorflow-models/mobilenet");

/**
 * Set the root folder with images. Triggers image finding.
 *
 * @param {String} input
 */
export const setRootFolderPath = (path) => {
  logAction("setRootFolderPath", path);
  store.rootFolderPath = path;

  triggerRecursiveImageFinding(path);
};

/**
 * Recursively find all the images on a given path
 *
 * @param {String} path - root path
 */
export const triggerRecursiveImageFinding = (path) => {
  logAction("triggerRecursiveImageFinding", path);

  // setup worker listener
  store.workers.recursiveImageFinderWorker.onmessage = ({ data }) => {
    setImagePathsList(data.imagePathsList);
    triggerImageTagsCalculation(data.imagePathsList);
  };

  // trigger worker
  store.workers.recursiveImageFinderWorker.postMessage({
    path,
  });
};

/**
 * Set the imagePathList - triggers
 *
 * @param {Array} imagePathList - list with all the image paths inside a folder
 */
export const setImagePathsList = (imagePathsList) => {
  logAction("setImagePathsList", imagePathsList.length);
  store.imagePathsList = imagePathsList;
  // triggerImageTagsCalculation(imagePathsList);
};

const loadImage = async (path) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onerror = (err) => reject(err);
    img.onload = () => resolve(img);

    img.src = `file:///${path}`;
  });
};

/**
 * Calculate the tags for a given image list
 *
 * @param {Array} imagePathsList - list of image paths
 */
export const triggerImageTagsCalculation = async (imagePathsList) => {
  logAction("triggerImageTagsCalculation", imagePathsList.length);

  const Comlink = require("comlink");

  // Worker: calculate tags for images
  const imageTaggingWorker = Comlink.wrap(store.workers.imageTaggingWorker);

  const imagesToProcessCount = imagePathsList.length;

  console.time("processAllImages");

  while (imagePathsList.length > 0) {
    const remaining = imagePathsList.length;

    // update analysis status in uiStore
    console.log(`To process: ${remaining} / ${imagesToProcessCount}`);

    console.time("processImage");

    const imagePath = imagePathsList.pop();
    console.log(imagePath);
    const hash = generateMD5Hash(imagePath);
    const imageData = await generateImageData(imagePath);

    console.time("classify");
    const tags = await imageTaggingWorker.process(imageData);
    console.timeEnd("classify");

    // save results in appStore
    // store.appStore.imageHashMap[hash] = { path: imagePath, tags };

    console.timeEnd("processImage");
  }

  console.timeEnd("processAllImages");
};

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

/**
 * Sets tags for an image. Initialize imageHashMap if not existing.
 *
 * @param {String} imagePath - image path
 * @param {Array} tags - array with tags
 */
export const setImageTags = (imagePath, tags) => {
  logAction("setImageTags", `${imagePath}: ${tags}`);
  const imageHash = generateMD5Hash(imagePath);

  if (store.imageHashMap[imageHash]) {
    // update if existing
    store.imageHashMap[imageHash].tags = tags;
  } else {
    // initialize if non existing
    store.imageHashMap[imageHash] = { hash: imageHash, path: imagePath, tags };
  }
};

const logAction = (name, payload) => {
  console.log(`%c A: ${name}: ${payload} `, "background: #222; color: #bada55");
};
