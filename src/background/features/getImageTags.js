import { classifyImage } from "./classifyImage";

/**
 * Get tags for image
 * @param {ImageData} imageData
 * @returns {Promise<string[]>} array with classification tags
 */
const getImageTags = async (imageData) => await classifyImage(imageData);

export default getImageTags;
