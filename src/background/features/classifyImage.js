// @ts-ignore-next-line
global.fetch = require("node-fetch");
const tf = require("@tensorflow/tfjs");
const mobilenet = require("@tensorflow-models/mobilenet");

const PROBABILITY_THRESHOLD = 0.65;

let net;

export async function loadModel() {
  if (net) return;

  console.time("loadModel mobilenet");
  net = await mobilenet.load();
  console.timeEnd("loadModel mobilenet");
}

/**
 * Generate image classification tags for a given image above a probability threshold
 * @param {ImageData} imageData
 * @returns {Promise<String[]>} tags
 */
export async function classifyImage(imageData) {
  if (!net) await loadModel();

  let pixels = tf.browser.fromPixels(imageData);
  let rawPredictions = await net.classify(pixels);

  // console.log(rawPredictions);

  // filter out predictions below threshold
  let filteredRawPredictions = rawPredictions.filter(
    (rawPrediction) => rawPrediction.probability > PROBABILITY_THRESHOLD
  );

  // console.log(filteredRawPredictions);

  // aggregate results, picking only the first name for each class
  const predictions = [];
  filteredRawPredictions.forEach((rawPrediction) => {
    const tag = rawPrediction.className.split(", ")[0].toLowerCase();
    predictions.push(tag);
  });

  // free memory by cleaning TF-internals and variables
  pixels.dispose();
  pixels = null;
  imageData = null;
  rawPredictions = null;
  filteredRawPredictions = null;

  return predictions;
}
