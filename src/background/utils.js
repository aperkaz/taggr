import crypto from "crypto";
import readdirp from "readdirp";

/**
 * Generate md5 hash string
 *
 * @param {String} input
 */
export function generateMD5Hash(input) {
  return crypto.createHash("md5").update(input).digest("hex");
}

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
    img.src = `file:///${path}`;
  });
}

/**
 * Generate a ImageData structure from a imagePath. Prepocess using Canvas to algorithm input: 224px
 *
 * @param {String} imagePath
 * @returns {Promise<ImageData>} loaded image
 */
export const generateImageData = async (imagePath) => {
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
 * Returns the images hashes of the images that dont have tags
 * @param {Object} imageHashMap
 */
export const getImagesWithoutTags = (imageHashMap) => {
  let imageHashListToProcess = [];
  Object.keys(imageHashMap).forEach((key) => {
    const image = imageHashMap[key];
    if (image.tags === null) {
      imageHashListToProcess.push(key);
    }
  });

  return imageHashListToProcess;
};

/**
 * Recursively find all the image paths inside the folderPath
 *
 * @param {String} folderPath
 * @returns {Promise<String[]>} imagePathsList
 */
export const recursivelyFindImages = async (folderPath) => {
  let imagePathsList = [];

  var settings = {
    // Filter files with js and json extension
    fileFilter: ["*.png", "*.PNG", "*.jpg", "*.JPG", ".*.jpeg", "*.JPEG"],
    // Filter by directory
    directoryFilter: ["!.git", "!*modules", "!.cache", "!.*"],
  };

  for await (const entry of readdirp(folderPath, settings)) {
    const { path } = entry;
    imagePathsList.push(`${folderPath}/${path}`);
  }

  return imagePathsList;
};