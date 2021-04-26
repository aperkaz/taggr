import fs from "fs";
import path from "path";
import sharp from "sharp";
import { ImageHashMapType } from "../../shared/entities";
import logger from "../../shared/logger";

const resizeImage = async (imagePath: string, outputPath: string) => {
  await sharp(imagePath, {
    failOnError: false,
  }) // failOnError: true, fixes Samsung corrupted pictures
    .jpeg({ quality: 80 })
    .resize(1980, 1080, { fit: sharp.fit.outside, withoutEnlargement: true })
    .toFile(outputPath);
};

async function doesFileExist(filePath: string) {
  return fs.promises
    .access(filePath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

/**
 * Pre-process only the images that dont exist
 */
const preProcessImages = async (
  imageMap: ImageHashMapType,
  outputPath: string,
  reporter: any
) => {
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
