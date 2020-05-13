import { sendToRenderer, sendToRendererThrottled } from "../services/utils";
import { setImages, setTask, setTags } from "../../renderer/store";

import generateImageData from "./generateImageData";
import { classifyImage } from "./classifyImage";

/**
 * Generate the tags for all the untaged images in the imageHashMap
 * Notifies task state to renderer
 * @param {Object} sourceImageHashMap
 */
const generateTags = async (sourceImageHashMap) => {
  const imageHashMap = {};

  const imageHasesToProcess = getImagesWithoutTags(sourceImageHashMap);

  let totalImagesToTag = imageHasesToProcess.length;
  let imagesTagged = 0;

  console.time("processImages");

  while (imageHasesToProcess.length > 0) {
    let hash = imageHasesToProcess.pop();

    let imageData = await generateImageData(sourceImageHashMap[hash].path);

    let tags = await classifyImage(imageData);

    imageHashMap[hash] = {
      ...sourceImageHashMap[hash],
      tags: tags ? tags : [],
    };

    console.log(`Processing: ${imagesTagged++} / ${totalImagesToTag}`);

    // clean up
    hash = null;
    imageData = null;
    tags = null;

    // update task status
    sendToRendererThrottled({
      type: setTask.type,
      payload: {
        percentage: Math.floor((imagesTagged * 100) / totalImagesToTag),
      },
    });
  }
  console.timeEnd("processImages");

  return imageHashMap;
};

/**
 * Returns the images hashes of the images that dont have tags
 * @param {Object} imageHashMap
 * @returns {string[]} list of image hashes without tags
 */
const getImagesWithoutTags = (imageHashMap) => {
  let imageHashListToProcess = [];
  Object.keys(imageHashMap).forEach((key) => {
    const image = imageHashMap[key];
    if (image.tags === null) {
      imageHashListToProcess.push(key);
    }
  });

  return imageHashListToProcess;
};

export default generateTags;
