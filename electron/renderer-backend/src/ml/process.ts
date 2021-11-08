import { getTags } from "./calculate-tags";
import { getFileCreationDate, getLocation } from "../utils/get-file-metadata";

import logger from "../../shared/logger";
import { ImageType } from "../../shared/entities";

/**
 * Extract all the information form an image
 * @returns {{location: {latitude: number, longitude: number}, tags: string[], creationDate: number}}
 */
const process = async function (imagePath: string): any {
  logger.log("processing image: ", imagePath);

  const tags = await getTags(imagePath);
  logger.log("tags: ", tags);
  const location = await getLocation(imagePath);
  logger.log("location: ", JSON.stringify(location));

  const creationDate = await getFileCreationDate(imagePath);

  const imageData = {
    location,
    tags,
    creationDate,
  };

  return imageData;
};

export default process;
