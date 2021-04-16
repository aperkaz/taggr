import { getTags } from "./calculate-tags";
import { getFileCreationDate, getLocation } from "../utils/get-file-metadata";

/**
 * Extract all the information form an image
 * @param {string} imagePath
 * @returns {{location: {latitude: number, longitude: number}, tags: string[], creationDate: number}}
 */
const process = async function (imagePath) {
  console.log("processing image: ", imagePath);

  const tags = await getTags(imagePath);
  console.log("tags: ", tags);
  const location = await getLocation(imagePath);
  console.log("location: ", JSON.stringify(location));

  const creationDate = await getFileCreationDate(imagePath);

  const imageData = {
    location,
    tags,
    creationDate,
  };

  return imageData;
};

export default process;
