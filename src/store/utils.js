const fs = require("fs");
const crypto = require("crypto");

/**
 * Generate md5 hash string
 *
 * @param {String} input
 * @returns {String} hash
 */
function generateMD5Hash(input) {
  return crypto.createHash("md5").update(input).digest("hex");
}

/**
 * Generate md5 hash from file
 *
 * @param {String} filePath
 * @returns {String} hash
 */
function generateMD5FileHash(filePath) {
  let file_buffer = fs.readFileSync(filePath);
  return crypto.createHash("md5").update(file_buffer).digest("hex");
}

/**
 * Find all the paths of images recursively inside path
 *
 * @param {String} folderPath
 * @returns {Promise<String[]>} imagePathsList
 */
async function findImagePathsInFolder(folderPath) {
  const readdirp = require("readdirp");
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
}

/**
 * Async queue with recursive executor
 */
class Queue {
  constructor(executor) {
    this.busy = false;
    this.queue = [];
    this.executor = executor;
  }

  async add(task) {
    if (this.busy) {
      // console.log("BUSY: task added");
      this.queue.push(task);
    } else {
      this.busy = true;
      await this.process(task);
    }
  }

  async process(task) {
    // console.log("------");
    // console.log("FREE: task executing");
    // console.time("execute");
    await this.executor(task);
    // console.timeEnd("execute");

    if (this.queue.length > 0) {
      await this.process(this.queue.pop());
    } else {
      this.busy = false;
    }
  }
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
    img.src = path;
  });
}

/**
 * Executor function that preprocesses image (extrac ImageData) and calculates the tags for an image(within worker)
 *
 *  @param {Worker} imageTaggingWorker
 */
const imageTaggingQueuExecutor = (imageTaggingWorker) => async (imagePath) => {
  console.log("EXECUTING: ", imagePath);
  console.time("loadImage");
  let img = await loadImage(imagePath);
  console.timeEnd("loadImage");

  let canvas = new OffscreenCanvas(img.width, img.height);
  canvas.getContext("2d").drawImage(img, 0, 0);

  let imageData = canvas
    .getContext("2d")
    .getImageData(0, 0, img.width, img.height);

  imageTaggingWorker.postMessage({
    path: imagePath,
    data: imageData,
  });

  // clean up for GC
  img = null;
  canvas = null;
  imageData = null;

  // set timeout to allow worker callback to be triggered
  await new Promise((r) => setTimeout(r, 200));
};

module.exports = {
  generateMD5Hash,
  generateMD5FileHash,
  findImagePathsInFolder,
  Queue,
  loadImage,
  imageTaggingQueuExecutor,
};
