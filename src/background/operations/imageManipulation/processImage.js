import { getImageLocation } from "./location";
import { classifyImage } from "../imageRecognition/classification";
import { loadImage, generateImageData } from "./utils";
import objectRecognitionImage from "../imageRecognition/objectRecognition";
import { calculateTags } from "../tags/customTags";

/**
 * Process an image and extract all the tags
 * @param {string} rawImagePath without file://
 * @param {string} imagePath with file://
 */
const processImage = async (rawImagePath, imagePath) => {
  console.time("loadImage");
  let imgHtml = await loadImage(imagePath);
  console.timeEnd("loadImage");

  console.time("imageData");
  let imageData = await generateImageData(imgHtml);
  console.timeEnd("imageData");

  // TODO: performance: extract to web worker to not block the other render processes
  // ML classification
  console.time("classify");
  const imageNetClassIds = await classifyImage(imageData);
  console.timeEnd("classify");

  // ML object recognition
  console.time("object");
  const cocoSsdClassNames = await objectRecognitionImage(imageData);
  console.timeEnd("object");

  const data = {
    location: await getImageLocation(rawImagePath),
    tags: calculateTags(imageNetClassIds, cocoSsdClassNames),
    // isSexy: await isImageSexy(smallImageData),
  };

  // clean up
  imageData = null;
  // imageDataFull = null;
  imgHtml = null;

  return data;
};

export default processImage;
