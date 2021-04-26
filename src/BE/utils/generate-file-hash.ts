const { promisify } = require("util");
const crypto = require("crypto");
const fs = require("fs");
const openFile = promisify(fs.open);
const readFile = promisify(fs.read);

/**
 * Generate md5 hash from file. Use the initial 4k only.
 */
async function generateFileHash(filePath: string) {
  const len = 4096,
    pos = 0,
    offset = 0,
    buff = Buffer.alloc(len);

  const fd = await openFile(filePath);
  const tempBuff = await readFile(fd, buff, offset, len, pos);
  const hash = crypto.createHash("md5").update(tempBuff.buffer).digest("hex");

  return hash;
}

export default generateFileHash;
