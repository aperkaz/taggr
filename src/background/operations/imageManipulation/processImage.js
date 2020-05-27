import { getImageLocation } from "./location";
import { classifyImage } from "../imageRecognition/classification";
// import { getImageTags } from "../tags";
import { loadImage, generateImageData } from "./utils";
import objectRecognitionImage from "../imageRecognition/objectRecognition";
import CUSTOM_TAGS, { calculateTag } from "../tags/customTags";

/**
 * Process an image and extract all the tags
 * @param {string} rawImagePath without file://
 * @param {string} imagePath with file://
 */
const processImage = async (rawImagePath, imagePath) => {
  let imgHtml = await loadImage(imagePath);
  let smallImageData = await generateImageData(imgHtml, 224);
  let fullImageData = await generateImageData(imgHtml, 720);

  const data = {
    location: await getImageLocation(rawImagePath),
    tags: await getImageTags(smallImageData, fullImageData),
    // isSexy: await isImageSexy(smallImageData),
  };

  // clean up
  imgHtml = null;
  smallImageData = null;
  fullImageData = null;

  return data;
};

/**
 * Run ML operations, analysis and trasform results to custom classes.
 * @param {ImageData} smallImageData
 * @param {ImageData} fullImageData
 * @returns {Promise<string[]>} custom tags
 */
const getImageTags = async (smallImageData, fullImageData) => {
  const tags = [];

  // ML classification
  const imageNetClassIds = await classifyImage(smallImageData);
  console.log(imageNetClassIds);

  // ML object recognition
  const cocoSsdClassNames = await objectRecognitionImage(fullImageData);
  console.log(cocoSsdClassNames);

  // Construct custom tags
  CUSTOM_TAGS.forEach((tag) => {
    const tagName = tag.name;
    if (calculateTag(imageNetClassIds, cocoSsdClassNames, tagName)) {
      tags.push(tagName);
    }
  });

  console.log(tags);

  return tags;
};

export default processImage;
