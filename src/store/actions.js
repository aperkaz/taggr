import store, { workers } from "./index";
import { generateMD5Hash } from "../utils";

const logAction = (name, payload) => {
  console.log(`%c A: ${name}: ${payload} `, "background: #222; color: #bada55");
};

/**
 * Set the root folder with images. Triggers image finding.
 *
 * @param {String} input
 */
const setRootFolderPath = (path) => {
  logAction("setRootFolderPath", path);
  store.rootFolderPath = path;

  triggerRecursiveImageFinding(path);
};

/**
 * Recursively find all the images on a given path
 *
 * @param {String} path - root path
 */
const triggerRecursiveImageFinding = (path) => {
  logAction("triggerRecursiveImageFinding", path);

  // trigger image finder task
  workers.recursiveImageFinderWorker.postMessage({
    path,
  });
};

/**
 * Set the appStatus. Triggers routing changes
 *
 * @param {AppStatus} status - from constants.js
 */
const setAppStatus = (status) => {
  logAction("setAppStatus", status);
  store.appStatus = status;
};

/**
 * Set the imagePathList - triggers
 *
 * @param {Array} imagePathList - list with all the image paths inside a folder
 */
const setImagePathsList = (imagePathsList) => {
  logAction("setImagePathsList", imagePathsList.length);
  store.imagePathsList = imagePathsList;
  triggerImageTagsCalculation(imagePathsList);
};

/**
 * Calculate the tags for a given image list
 *
 * @param {Array} imagePathsList - list of image paths
 */
const triggerImageTagsCalculation = (imagePathsList) => {
  logAction("triggerImageTagsCalculation", imagePathsList.length);

  imagePathsList.forEach((path) => {
    workers.imageTaggingWorker.postMessage({
      path,
    });
  });
};

/**
 * Sets tags for an image. Initialize imageHashMap if not existing.
 *
 * @param {String} imagePath - image path
 * @param {Array} tags - array with tags
 */
const setImageTags = (imagePath, tags) => {
  logAction("setImageTags", `${imagePath}: ${tags}`);
  const imageHash = generateMD5Hash(imagePath);

  if (store.imageHashMap[imageHash]) {
    // update if existing
    store.imageHashMap[imageHash].tags = tags;
  } else {
    // initialize if non existing
    store.imageHashMap[imageHash] = { path: imagePath, tags };
  }
};

// manage side effects and state mutations
export default {
  setRootFolderPath,
  setAppStatus,
  setImagePathsList,
  setImageTags,
  // worker actions
  triggerImageTagsCalculation,
};
