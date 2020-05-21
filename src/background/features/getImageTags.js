import generateImageData from "./generateImageData";
import { classifyImage } from "./classifyImage";

/**
 * Get tags for image
 * @param {string} imagePath
 */
const getImageTags = async (imagePath) => {
  let imageData = await generateImageData(imagePath);
  let tags = await classifyImage(imageData);

  // clean up
  imageData = null;

  return tags;
};

export default getImageTags;
