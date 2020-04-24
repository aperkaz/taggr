/**
 * Generate md5 hash string
 *
 * @param {String} input
 * @returns {String} hash
 */
function generateMD5Hash(input) {
  const crypto = require("crypto");

  return crypto.createHash("md5").update(input).digest("hex");
}

/**
 * Generate md5 hash from file
 *
 * @param {String} filePath
 * @returns {String} hash
 */
function generateMD5FileHash(filePath) {
  const fs = require("fs");
  const crypto = require("crypto");

  let file_buffer = fs.readFileSync(filePath);
  return crypto.createHash("md5").update(file_buffer).digest("hex");
}

module.exports = {
  generateMD5Hash,
  generateMD5FileHash,
};
