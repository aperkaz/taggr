import logger from "../../../shared/logger";

const MIN_SCORE = 0.5;

let net;

// initialize model
loadModel();

async function loadModel() {
  const cocoSsd = require("@tensorflow-models/coco-ssd");

  logger.time("loadModel object recognition");
  net = await cocoSsd.load();
  logger.timeEnd("loadModel object recognition");
}

/**
 * Get coco-ssd class ids for an image
 * @param {Image} img
 * @returns {Promise<string[]>} array with coco-ssd class names
 */
export const getObjectRecognitionClassNames = async (img) => {
  if (!net) await loadModel();

  let cocoSsdClassNames = [];

  try {
    let predictions = await net.detect(img);

    predictions.forEach((prediction) => {
      const score = prediction.score;
      const predictedClass = prediction.class;
      if (score > MIN_SCORE) {
        cocoSsdClassNames.push(predictedClass);
      }
    });
  } catch (e) {
    logger.log(e);
  }

  return cocoSsdClassNames;
};
