const fs = require("fs");
const crypto = require("crypto");

/**
 * Generate md5 hash string
 *
 * @param {String} input
 */
function generateMD5Hash(input) {
  return crypto.createHash("md5").update(input).digest("hex");
}

/**
 * Generate md5 hash from file
 *
 * @param {String} filePath
 */
function generateMD5FileHash(filePath) {
  let file_buffer = fs.readFileSync(filePath);
  return crypto.createHash("md5").update(file_buffer).digest("hex");
}

class Queue {
  constructor(executor) {
    this.busy = false;
    this.queue = [];
    this.executor = executor;
  }

  async add(task) {
    if (this.busy) {
      console.log("BUSY: task added");
      this.queue.push(task);
    } else {
      this.busy = true;
      await this.process(task);
    }
  }

  async process(task) {
    console.log("------");
    console.log("FREE: task executing");
    console.time("execute");
    await this.executor(task);
    console.timeEnd("execute");

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
  Queue,
};
