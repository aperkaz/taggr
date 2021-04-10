const sharp = require("sharp");
const path = require("path");

const { logFunctionPerf } = require("./utils");

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

/**
 * Resize only the non-resized images
 * @param {string[]} imagePathList
 * @param {string} outputPath
 */
const resizeImages = async (imagePathList, outputDir) => {
  // 5s
  // OPTIMIZE: https://github.com/rxaviers/async-pool
  //   const resizePromises = imagePathList.map((imagePath) => {
  //     const fileName = path.parse(imagePath).base;
  //     const outputPath = `${outputDir}/${fileName}.jpg`;
  //     return resizeImage(imagePath, outputPath);
  //   });
  //   await Promise.allSettled(resizePromises);

  // 7.5s
  await asyncForEach(imagePathList, async (imagePath) => {
    const fileName = path.parse(imagePath).base;
    const outputPath = `${outputDir}/${fileName}.jpg`;
    await resizeImage(imagePath, outputPath);
  });
};

const resizeImage = async (imagePath, outputPath) => {
  // OPTIMIZE: only resize the ones that dont exists! https://attacomsian.com/blog/how-to-check-if-a-file-exists-in-nodejs

  await sharp(imagePath, { failOnError: false }) // failOnError: true, fixes Samsung corrupted pictures
    .resize(1980, 1080, { fit: sharp.fit.outside, withoutEnlargement: true })
    .toFile(outputPath);
};

(async () => {
  const imagePathList = [
    "/Users/alain/temp/pictures/aleksandra-tanasiienko-bV25rEvXBhI-unsplash.jpg",
    "/Users/alain/temp/pictures/bobby-stevenson-KJtbBUnKRRQ-unsplash.jpg",
    "/Users/alain/temp/pictures/boris-smokrovic-lyvCvA8sKGc-unsplash.jpg",
    "/Users/alain/temp/pictures/deva-williamson-sjsG1yrwJxY-unsplash.jpg",
    "/Users/alain/temp/pictures/docusign-XMQHdgirB0U-unsplash.jpg",
    "/Users/alain/temp/pictures/docusign-ujkG7mTs7IM-unsplash.jpg",
    "/Users/alain/temp/pictures/dominik-lange-BFsm5vldl2I-unsplash.jpg",
    "/Users/alain/temp/pictures/francesco-de-tommaso-ZxNKxnR32Ng-unsplash.jpg",
    "/Users/alain/temp/pictures/franzi-meyer-Fdd0kJtqtSI-unsplash.jpg",
    "/Users/alain/temp/pictures/frosty-ilze-tfYL1j1jKNo-unsplash.jpg",
    "/Users/alain/temp/pictures/harold-wainwright-awHDN3WUCOo-unsplash.jpg",
    "/Users/alain/temp/pictures/joshua-mcarthur-KNejiz13lCs-unsplash.jpg",
    "/Users/alain/temp/pictures/junho-4AXPcy361tk-unsplash.jpg",
    "/Users/alain/temp/pictures/laura-college-K_Na5gCmh38-unsplash.jpg",
    "/Users/alain/temp/pictures/lilian-velet-X2gQ8xI5PNI-unsplash.jpg",
    "/Users/alain/temp/pictures/lisha-riabinina-p-6CXeowTMU-unsplash.jpg",
    "/Users/alain/temp/pictures/naraa-in-ub-T_kTdILw9uo-unsplash.jpg",
    "/Users/alain/temp/pictures/omar-ram-iU1Pu16JN7k-unsplash.jpg",
    "/Users/alain/temp/pictures/rasmus-smedstrup-mortensen-vsWAMgLmo-0-unsplash.jpg",
    "/Users/alain/temp/pictures/surface-N--7q6GwL84-unsplash.jpg",
    "/Users/alain/temp/pictures/surface-aqdPtCtq3dY-unsplash.jpg",
    "/Users/alain/temp/pictures/wexor-tmg-L-2p8fapOA8-unsplash.jpg",
    "/Users/alain/temp/pictures/will-norbury--aDYQJdETkA-unsplash.jpg",
  ];
  logFunctionPerf(resizeImages)(imagePathList, "/Users/alain/Downloads/output");
})();
