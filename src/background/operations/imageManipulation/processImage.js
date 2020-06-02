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
  let imgHtml = await loadImage(imagePath);
  let imageData = await generateImageData(imgHtml);
  // let imageDataFull = await generateImageData(imgHtml, 500);

  // ML classification
  const imageNetClassIds = await classifyImage(imageData);
  console.log(imageNetClassIds);

  // ML object recognition
  const cocoSsdClassNames = await objectRecognitionImage(imageData);
  console.log(cocoSsdClassNames);

  const data = {
    location: await getImageLocation(rawImagePath),
    tags: calculateTags(imageNetClassIds, cocoSsdClassNames),
    // tags: calculateTags(imageNetClassIds, []),
    // isSexy: await isImageSexy(smallImageData),
  };

  // clean up
  imageData = null;
  // imageDataFull = null;
  imgHtml = null;

  return data;
};

export default processImage;
