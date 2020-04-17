global.fetch = require("node-fetch");

// const tf = require("@tensorflow/tfjs");
const mobilenet = require("@tensorflow-models/mobilenet");
const tf = require("@tensorflow/tfjs-node");

const fs = require("fs");
const jpeg = require("jpeg-js");

const NUMBER_OF_CHANNELS = 3;
const PROBABILITY_THRESHOLD = 0.1;

const MODEL_URL = "file://src/models/mobilenet/model.json";

let net;

const readImage = (path) => {
  console.time("readImage");
  const buf = fs.readFileSync(path);
  console.timeEnd("readImage");
  console.time("decode");
  const pixels = jpeg.decode(buf, true);
  console.timeEnd("decode");
  return pixels;
};

const imageByteArray = (image, numChannels) => {
  const pixels = image.data;
  const numPixels = image.width * image.height;
  const values = new Int32Array(numPixels * numChannels);

  for (let i = 0; i < numPixels; i++) {
    for (let channel = 0; channel < numChannels; ++channel) {
      values[i * numChannels + channel] = pixels[i * 4 + channel];
    }
  }

  return values;
};

const imageToInput = (image, numChannels) => {
  console.time("imageToInput");
  const values = imageByteArray(image, numChannels);
  const outShape = [image.height, image.width, numChannels];
  const input = tf.tensor3d(values, outShape, "int32");

  console.timeEnd("imageToInput");

  return input;
};

async function loadModel() {
  if (net) return;

  console.time("loadModel");

  net = await mobilenet.load({
    modelUrl: MODEL_URL,
    version: 1,
    alpha: 1,
    // fix the default of [-1,1]
    inputRange: [0, 1],
  });

  console.timeEnd("loadModel");
  return;
}

/**
 * Generate image classification tags for a given imagea above a probability threshold
 * @param {String} imagePath
 * @returns {Array} tags
 */
async function classifyImage(imagePath) {
  const image = readImage(imagePath);
  const input = imageToInput(image, NUMBER_OF_CHANNELS);

  await loadModel();

  console.time("classifyImage");
  const rawPredictions = await net.classify(input);
  console.timeEnd("classifyImage");

  // filter out predictions below threshold
  const filteredRawPredictions = rawPredictions.filter(
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

  // free memory from TF-internal libraries from input image
  input.dispose();

  return predictions;
}

module.exports = {
  loadModel,
  classifyImage,
};
