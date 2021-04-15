import fs from "fs";
import path from "path";
import sharp from "sharp";

/**
 * @param {string} imagePath
 * @param {string} outputPath
 * @returns {Promise<void>}
 */
const resizeImage = async (imagePath, outputPath) => {
  await sharp(imagePath, { failOnError: false }) // failOnError: true, fixes Samsung corrupted pictures
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
const preProcessImages = async (imageMap, outputPath) => {
  const hashes = Object.keys(imageMap);

  const resizePromise = [];

  for (const hash of hashes) {
    const image = imageMap[hash];

    const preProcessedImagePath = path.join(outputPath, `${image.hash}.jpg`);

    const fileExists = await doesFileExist(preProcessedImagePath);

    if (!fileExists) {
      try {
        resizePromise.push(resizeImage(image.rawPath, preProcessedImagePath));
      } catch (err) {
        console.log(err);
      }
    }
  }

  await Promise.all(resizePromise);
};

export default preProcessImages;
