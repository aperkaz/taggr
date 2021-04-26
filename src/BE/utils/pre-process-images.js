import fs from "fs";
import path from "path";
import sharp from "sharp";
import logger from "../../shared/logger";

/**
 * @param {string} imagePath
 * @param {string} outputPath
 * @returns {Promise<void>}
 */
const resizeImage = async (imagePath, outputPath) => {
  await sharp(imagePath, {
    failOnError: false,
  }) // failOnError: true, fixes Samsung corrupted pictures
    .jpeg({ quality: 80 })
    .resize(1980, 1080, { fit: sharp.fit.outside, withoutEnlargement: true })
    .toFile(outputPath);
};

/**
 * @param {string} filePath
 * @returns {Promise<boolean>}
 */
async function doesFileExist(filePath) {
  return fs.promises
    .access(filePath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

/**
 * Pre-process only the images that dont exist
 * @param {import("../../shared/entities").ImageHashMapType} imageMap
 * @param {string} outputPath
 */
const preProcessImages = async (imageMap, outputPath, reporter) => {
  logger.time("preProcessImages");

  const hashes = Object.keys(imageMap);

  const resizePromises = [];

  let processed = 0;
  for (const hash of hashes) {
    reporter(processed++);

    const image = imageMap[hash];

    const preProcessedImagePath = path.join(outputPath, `${image.hash}.jpeg`);

    const fileExists = await doesFileExist(preProcessedImagePath);

    if (!fileExists) {
      try {
        // await resizeImage(image.rawPath, preProcessedImagePath);
        resizePromises.push(resizeImage(image.rawPath, preProcessedImagePath));
      } catch (err) {
        logger.error(err);
      }
    }
  }

  await Promise.all(resizePromises);

  logger.timeEnd("preProcessImages");
};

export default preProcessImages;
