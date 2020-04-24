// @ts-ignore-next-line
global.fetch = require("node-fetch");

const path = require("path");
const url = require("url");

const tf = require("@tensorflow/tfjs-node");

const PROBABILITY_THRESHOLD = 0.5;

const MODEL_URL = url.format({
  pathname: path.join(__dirname, "./models/mobilenet/model.json"),
  protocol: "file:",
  slashes: true,
});

let net;

async function loadModel() {
  const mobilenet = require("@tensorflow-models/mobilenet");

  if (net) return;

  console.time("loadModel");

  if (process.env.DEVELOPMENT_ENV) {
    net = await mobilenet.load({
      modelUrl: MODEL_URL,
      version: 1,
      alpha: 1,
      inputRange: [0, 1], // fix the default of [-1,1]
    });
  } else {
    // FIX: issue: when packaging, make sure the model files are copied elsewhere https://github.com/electron-userland/electron-forge/issues/1592
    net = await mobilenet.load();
  }

  console.timeEnd("loadModel");
  return;
}

/**
 * Generate image classification tags for a given image above a probability threshold
 * @param {ImageData} imageData
 * @returns {Promise<String[]>} tags
 */
async function classifyImage(imageData) {
  const pixels = tf.browser.fromPixels(imageData);
  // Most required when passing an image Data of bigger sizes, to speed up // smallImg.dispose();
  const smallImg = tf.image.resizeBilinear(pixels, [224, 224]);

  let rawPredictions = await net.classify(smallImg);
  console.log(rawPredictions);

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
  smallImg.dispose();
  imageData = null;
  rawPredictions = null;
  filteredRawPredictions = null;

  return predictions;
}

module.exports = classifyImage;

// load the required tensorflow.js models required by the worker on startup
(async () => {
  try {
    await loadModel();
    // console.log(await classifyImage("home/alain/Desktop/a/0.jpg"));
  } catch (err) {
    console.log(err);
  }
})();
