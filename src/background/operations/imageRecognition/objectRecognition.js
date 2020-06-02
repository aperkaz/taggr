const tf = require("@tensorflow/tfjs");
const cocoSsd = require("@tensorflow-models/coco-ssd");

const MIN_SCORE = 0.5;

let net;

export const loadModel = async () => {
  console.time("loadModel coco-ssd");
  // net = await cocoSsd.load({ base: "mobilenet_v2" });
  net = await cocoSsd.load();
  console.timeEnd("loadModel coco-ssd");
};

/**
 * Get coco-ssd class ids for an image
 * @param {ImageData} imageData
 * @returns {Promise<string[]>} array with coco-ssd class names
 */
const objectRecognitionImage = async (imageData) => {
  const cocoSsdClassNames = [];

  if (!net) await loadModel();

  let pixels = tf.tidy(() => tf.browser.fromPixels(imageData));

  console.time("detect objects");
  let predictions = await net.detect(pixels);

  predictions.forEach((prediction) => {
    const score = prediction.score;
    const predictedClass = prediction.class;
    if (score > MIN_SCORE) {
      cocoSsdClassNames.push(predictedClass);
    }
  });
  console.timeEnd("detect objects");

  // free memory by cleaning TF-internals and variables
  pixels.dispose();
  pixels = null;
  predictions = null;

  return cocoSsdClassNames;
};

export default objectRecognitionImage;
