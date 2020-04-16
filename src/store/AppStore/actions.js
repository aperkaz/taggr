import * as tf from "@tensorflow/tfjs";

import store from "./index";
import { generateMD5Hash } from "../../utils";

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

    img.src = path;
  });
};

/**
 * Calculate the tags for a given image list
 *
 * @param {Array} imagePathsList - list of image paths
 */
export const triggerImageTagsCalculation = async (imagePathsList) => {
  logAction("triggerImageTagsCalculation", imagePathsList.length);

  // setup worker listener
  store.workers.imageTaggingWorker.onmessage = ({ data }) => {
    setImageTags(data.path, data.tags);
  };

  // trigger worker
  imagePathsList.forEach((imagePath) => {
    store.workers.imageTaggingWorker.postMessage({
      path: imagePath,
    });
  });
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
