import normalize from "normalize-path";

import logger from "../../shared/logger";

const normalizePath = (imagePath: string): string => {
  // logger.log("normalizePath: ", imagePath);
  let normalizedImagePath;
  // fixes linux / windows compatibility
  try {
    normalizedImagePath = normalize(imagePath);
    return normalizedImagePath.startsWith("http")
      ? normalizedImagePath
      : `file://${normalizedImagePath}`;
  } catch (e) {
    logger.error(e);
  }
};

export default normalizePath;
