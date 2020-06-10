/**
 * Normalize image paths for cross system compatibility
 * @param {string} imagePath
 */
const normalizeImageUrl = (imagePath) => {
  const normalize = require("normalize-path");

  // fixes linux / windows compatibility
  const normalizedImagePath = normalize(imagePath);
  return normalizedImagePath.startsWith("http")
    ? normalizedImagePath
    : `file://${normalizedImagePath}`;
};

module.exports = normalizeImageUrl;
