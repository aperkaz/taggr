import path from "path";
import url from "url";
// @ts-ignore-next-line
global.fetch = require("node-fetch");
const tf = require("@tensorflow/tfjs");
const mobilenet = require("@tensorflow-models/mobilenet");

const PROBABILITY_THRESHOLD = 0.5;

const MODEL_URL = url.format({
  pathname: path.join(__dirname, "./models/mobilenet/model.json"),
  protocol: "file:",
  slashes: true,
});

let net;

async function loadModel() {
  if (net) return;

  console.time("loadModel");

  // if (process.env.DEVELOPMENT_ENV) {
  //   net = await mobilenet.load({
  //     modelUrl: MODEL_URL,
  //     version: 1,
  //     alpha: 1,
  //     inputRange: [0, 1], // fix the default of [-1,1]
  //   });
  // } else {
  net = await mobilenet.load();
  // }
  console.timeEnd("loadModel");
}

/**
 * Generate image classification tags for a given image above a probability threshold
 * @param {ImageData} imageData
 * @returns {Promise<String[]>} tags
 */
async function classifyImage(imageData) {
  if (!net) await loadModel();

  const pixels = tf.browser.fromPixels(imageData);

  let rawPredictions = await net.classify(pixels);

  // filter out predictions below threshold
  let filteredRawPredictions = rawPredictions.filter(
    (rawPrediction) => rawPrediction.probability > PROBABILITY_THRESHOLD
  );

  // aggregate results
  const predictions = [];
  filteredRawPredictions.forEach((rawPrediction) => {
    const tags = rawPrediction.className
      .split(", ")
      .map((name) => name.toLowerCase());
    predictions.push(...tags);
  });

  // free memory by cleaning TF-internals and variables
  pixels.dispose();
  imageData = null;
  rawPredictions = null;
  filteredRawPredictions = null;

  return rawPredictions;
}

export default classifyImage;
