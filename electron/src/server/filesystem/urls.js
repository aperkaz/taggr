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

module.exports = { normalizeUrl };
