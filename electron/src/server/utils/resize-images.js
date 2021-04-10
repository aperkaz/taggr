const sharp = require("sharp");
const path = require("path");
const logFunctionPerf = require("./log-function-perf");

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

/**
 * Resize images
 * @param {string[]} imagePathList
 * @param {string} outputPath
 */
const resizeImages = async (imagePathList, outputDir) => {
  await asyncForEach(imagePathList, async (imagePath) => {
    const hash = await generateFileHash(imagePath);
    const outputPath = `${outputDir}/${hash}.jpg`;
    await resizeImage(imagePath, outputPath);
  });
};

const resizeImage = async (imagePath, outputPath) => {
  await sharp(imagePath, { failOnError: false }) // failOnError: true, fixes Samsung corrupted pictures
    .resize(1980, 1080, { fit: sharp.fit.outside, withoutEnlargement: true })
    .toFile(outputPath);
};

module.exports = logFunctionPerf(resizeImages);
