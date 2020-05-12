import * as Comlink from "comlink";

// import { classifyImage } from "./tfImageClassification";
class MyClass {
  async init() {
    this.net = await loadModel();
  }

  async process(imageData) {
    return await classifyImage(this.net, imageData);
  }
}

Comlink.expose(MyClass);

// import tf from "@tensorflow/tfjs";
// import mobilenet from "@tensorflow-models/mobilenet";

const PROBABILITY_THRESHOLD = 0.5;

// let net;

async function loadModel() {
  const mobilenet = require("@tensorflow-models/mobilenet");

  // if (net) return;

  console.log("loading model");

  console.time("loadModel");

  // if (process.env.DEVELOPMENT_ENV) {
  //   net = await mobilenet.load({
  //     modelUrl: MODEL_URL,
  //     version: 1,
  //     alpha: 1,
  //     inputRange: [0, 1], // fix the default of [-1,1]
  //   });
  // } else {
  const net = await mobilenet.load();
  // }
  console.timeEnd("loadModel");

  return net;
}
/**
 * Generate image classification tags for a given image above a probability threshold
 * @param {ImageData} imageData
 * @returns {Promise<String[]>} tags
 */
async function classifyImage(net, imageData) {
  const tf = require("@tensorflow/tfjs");

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
