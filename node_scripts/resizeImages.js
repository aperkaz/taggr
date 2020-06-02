const sharp = require("sharp");
const path = require("path");

// fixes memmory leak, using tiny queue
sharp.cache(false);
sharp.concurrency(1);

const asyncPool = require("tiny-async-pool");

const inputPath = "/home/alain/Desktop/pics/pictures"; // ex. 35GB
const outputPath = "/home/alain/Desktop/pics/out"; // ex. 300MB x100 smaller (conversion in )

async function run() {
  const imagePaths = await recursivelyFindImages(inputPath); // ex. 2:13.706 (mm:ss.mmm)

  console.time("resizeImages");
  await resizeImages(imagePaths, outputPath);
  console.timeEnd("resizeImages");

  console.log("images: ", imagePaths.length);
}

const recursivelyFindImages = async (folderPath) => {
  console.time("findImages");
  const readdirp = require("readdirp");

  let imagePathsList = [];

  var settings = {
    // Filter files with js and json extension
    fileFilter: ["*.png", "*.PNG", "*.jpg", "*.JPG", "*.jpeg", "*.JPEG"],
    // Filter by directory
    directoryFilter: ["!.git", "!*modules", "!.cache", "!.*"],
  };

  for await (const entry of readdirp(folderPath, settings)) {
    const { path } = entry;
    imagePathsList.push(`${folderPath}/${path}`);
  }

  console.timeEnd("findImages");
  return imagePathsList;
};

const resizeImages = async (imageList, outputPath) => {
  const resizeImagePromise = resizeImagePromiseIterator(outputPath);
  await asyncPool(4, imageList, resizeImagePromise);
};

const resizeImagePromiseIterator = (outputPath) => async (sourcePath) => {
  const fileName = path.parse(sourcePath).base;

  // resize image
  // failOnError: fixes Samsung corrupted pictures
  return (
    sharp(sourcePath, { failOnError: false })
      .withMetadata()
      .resize(224, 224, {
        // fit: sharp.fit.inside,
        fit: sharp.fit.outside,
        withoutEnlargement: true,
      })
      // .toBuffer();
      .toFile(`${outputPath}/${fileName}-128x128.jpg`)
  );
};

run().catch(console.error);
