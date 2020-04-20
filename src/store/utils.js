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

module.exports = {
  generateMD5Hash,
  generateMD5FileHash,
  findImagePathsInFolder,
  Queue,
};
