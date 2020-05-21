import generateImageData from "./generateImageData";
import { classifyImage } from "./classifyImage";

/**
 * Get tags for image
 * @param {ImageData} imageData
 */
const getImageTags = async (imageData) => {
  // let imageData = await generateImageData(imagePath);
  let tags = await classifyImage(imageData);

  // clean up
  imageData = null;

  return tags;
};

export default getImageTags;
