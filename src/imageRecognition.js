global.fetch = require("node-fetch");

const tf = require("@tensorflow/tfjs");
const mobilenet = require("@tensorflow-models/mobilenet");
require("@tensorflow/tfjs-node");

const fs = require("fs");
const jpeg = require("jpeg-js");

const NUMBER_OF_CHANNELS = 3;

let mn_model;

// "@tensorflow-models/mobilenet": "^2.0.4",
// "@tensorflow/tfjs": "^1.7.2",
// "@tensorflow/tfjs-node": "^1.7.2",

const readImage = (path) => {
  console.time("readImage");
  const buf = fs.readFileSync(path);
  const pixels = jpeg.decode(buf, true);
  console.timeEnd("readImage");
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

const loadModel = async () => {
  console.time("loadModel");
  const mn = new mobilenet.MobileNet(1, 1);
  mn.path = `https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_1.0_224/model.json`;
  await mn.load();
  console.timeEnd("loadModel");
  return mn;
};

async function classifyImage(path) {
  const image = readImage(path);
  const input = imageToInput(image, NUMBER_OF_CHANNELS);

  if (!mn_model) {
    mn_model = await loadModel();
  }

  console.time("classify");
  const rawPredictions = await mn_model.classify(input);

  // filter out predictions below threshold
  const filteredRawPredictions = rawPredictions.filter(
    (rawPrediction) => rawPrediction.probability > 0.3
  );

  // aggregate results
  const predictions = [];
  filteredRawPredictions.forEach((rawPrediction) => {
    const tags = rawPrediction.className.split(", ");
    console.log(tags);
    predictions.push(...tags);
  });

  console.log("raw classification results:", rawPredictions);
  console.log("classification results:", predictions);
  console.timeEnd("classify");

  console.log("--");

  // free memory from TF-internal libraries from input image
  input.dispose();

  return predictions;
}

module.exports = {
  classifyImage,
};
