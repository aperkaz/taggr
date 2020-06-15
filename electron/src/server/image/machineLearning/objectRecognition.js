const tf = require("@tensorflow/tfjs");
const cocoSsd = require("@tensorflow-models/coco-ssd");

const MIN_SCORE = 0.5;

let net;

// initialize model
loadModel();

async function loadModel() {
  console.time("loadModel object recognition");
  // net = await cocoSsd.load({ base: "mobilenet_v2" });
  net = await cocoSsd.load();
  console.timeEnd("loadModel object recognition");
}

/**
 * Get coco-ssd class ids for an image
 * @param {ImageData} imageTensor
 * @returns {Promise<string[]>} array with coco-ssd class names
 */
async function getObjectRecognitionClassNames(imageTensor) {
  if (!net) await loadModel();

  let cocoSsdClassNames = [];

  try {
    let predictions = await net.detect(imageTensor);

    predictions.forEach((prediction) => {
      const score = prediction.score;
      const predictedClass = prediction.class;
      if (score > MIN_SCORE) {
        cocoSsdClassNames.push(predictedClass);
      }
    });
  } catch (e) {
    // TODO: Sentry: send error.
    // Error when object recognitions image
    console.log(e);
  }

  return cocoSsdClassNames;
}

module.exports = { getObjectRecognitionClassNames };
