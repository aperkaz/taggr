const bytenode = require("bytenode");
const crypto = require("crypto");

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
 * Generate md5 hash from string
 *
 * @param {string} data
 */
function generateMD5HashFromString(data) {
  return crypto.createHash("md5").update(data).digest("hex");
}

module.exports = { normalizeUrl, generateMD5HashFromString };
