global.fetch = require("node-fetch");

const tf = require("@tensorflow/tfjs-node");

const path = require("path");
const url = require("url");

const MODEL_URL = url.format({
  pathname: path.join(__dirname, "./models/mobilenet/model.json"),
  protocol: "file:",
  slashes: true,
});

const PROBABILITY_THRESHOLD = 0.5;

let net;

async function loadModel() {
  const mobilenet = require("@tensorflow-models/mobilenet");

  if (net) return;

  console.time("loadModel");

  // TODO: issue: when packaging, make sure the model files are copied elsewhere https://github.com/electron-userland/electron-forge/issues/1592
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
 * Generate image classification tags for a given image above a probability threshold
 * @param {String} imagePath
 * @returns {Array} tags
 */
async function classifyImage(data) {
  // console.time("transform");
  const pixels = tf.browser.fromPixels(data);
  const smallImg = tf.image.resizeBilinear(pixels, [224, 224]);
  // console.timeEnd("transform");

  // console.time("detect");
  let rawPredictions = await net.classify(smallImg);
  // console.timeEnd("detect");

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
  data = null;
  rawPredictions = null;
  filteredRawPredictions = null;

  return predictions;
}

module.exports = {
  classifyImage,
};

// load the required tensorflow.js models required by the worker on startup
(async () => {
  try {
    await loadModel();
    // console.log(await classifyImage("home/alain/Desktop/a/0.jpg"));
  } catch (err) {
    console.log(err);
  }
})();
