const bytenode = require("bytenode");
const crypto = require("crypto");
const fs = require("fs");
const { promisify } = require("util");
const openFile = promisify(fs.open);
const readFile = promisify(fs.read);

/**
 * Normalize paths for cross system compatibility
 * @param {string} imagePath
 */
const normalizeUrl = (imagePath) => {
  const normalize = require("normalize-path");

  // fixes linux / windows compatibility
  const normalizedImagePath = normalize(imagePath);
  return normalizedImagePath.startsWith("http")
    ? normalizedImagePath
    : `file://${normalizedImagePath}`;
};

/**
 * Generate md5 hash from file. Use initial 4k only.
 *
 * @param {string} filePath
 */
async function generateMD5HashFromFile(filePath) {
  const len = 4096,
    pos = 0,
    offset = 0,
    buff = Buffer.alloc(len);

  const fd = await openFile(filePath);
  const tempBuff = await readFile(fd, buff, offset, len, pos);
  const hash = crypto.createHash("md5").update(tempBuff.buffer).digest("hex");

  return hash;
}

module.exports = { normalizeUrl, generateMD5HashFromFile };
