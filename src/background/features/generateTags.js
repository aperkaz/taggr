import { sendToRendererThrottled } from "../services/utils";
import generateImageData from "./generateImageData";
import { classifyImage } from "./classifyImage";
import { getStopFlow } from "../store";

import { setTask } from "../../renderer/store";

/**
 * Generate the tags for all the untaged images in the imageHashMap
 * Notifies task state to renderer
 * @param {Object} sourceImageHashMap
 */
const generateTags = async (sourceImageHashMap) => {
  if (getStopFlow()) return;

  const imageHashMap = {};

  const imageHasesToProcess = getImagesWithoutTags(sourceImageHashMap);

  let totalImagesToTag = imageHasesToProcess.length;
  let imagesTagged = 0;

  console.time("processImages");

  while (imageHasesToProcess.length > 0) {
    if (getStopFlow()) return;

    let hash = imageHasesToProcess.pop();

    // console.time("generateImageData");
    let imageData = await generateImageData(sourceImageHashMap[hash].path);
    // console.timeEnd("generateImageData");

    // console.time("classifyImage");
    let tags = await classifyImage(imageData);
    // console.timeEnd("classifyImage");

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
