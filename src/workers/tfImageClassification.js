global.fetch = require("node-fetch");

const tf = require("@tensorflow/tfjs");
const mobilenet = require("@tensorflow-models/mobilenet");
require("@tensorflow/tfjs-node");

const fs = require("fs");
const jpeg = require("jpeg-js");

const NUMBER_OF_CHANNELS = 3;
const PROBABILITY_THRESHOLD = 0.1;

let mn_model;

const readImage = (path) => {
  const buf = fs.readFileSync(path);
  const pixels = jpeg.decode(buf, true);
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
  const values = imageByteArray(image, numChannels);
  const outShape = [image.height, image.width, numChannels];
  const input = tf.tensor3d(values, outShape, "int32");

  return input;
};

async function loadModel() {
  if (mn_model) return;

  console.log("loadModel()");
  console.time("loadModel");
  const mn = new mobilenet.MobileNet(1, 1);
  mn.path = `https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_1.0_224/model.json`;
  await mn.load();
  console.timeEnd("loadModel");
  mn_model = mn;
  return mn;
}

/**
 * Generate image classification tags for a given imagea above a probability threshold
 * @param {String} imagePath
 * @returns {Array} tags
 */
async function classifyImage(imagePath) {
  console.time("classifyImage");
  const image = readImage(imagePath);
  const input = imageToInput(image, NUMBER_OF_CHANNELS);

  await loadModel();

  const rawPredictions = await mn_model.classify(input);

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

  console.timeEnd("classifyImage");
  return predictions;
}

module.exports = {
  loadModel,
  classifyImage,
};
