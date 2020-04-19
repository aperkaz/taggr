if (typeof OffscreenCanvas !== "undefined") {
  self.document = {
    createElement: () => {
      return new OffscreenCanvas(640, 480);
    },
  };
  self.window = {
    screen: {
      width: 640,
      height: 480,
    },
  };
  // self.HTMLVideoElement = function () {};
  // // self.HTMLImageElement = function () {};
  // self.HTMLCanvasElement = OffscreenCanvas;
}

global.fetch = require("node-fetch");

const mobilenet = require("@tensorflow-models/mobilenet");
// const tf = require("@tensorflow/tfjs-node");

const fs = require("fs");
const jpeg = require("jpeg-js");

const path = require("path");
const url = require("url");

// console.log("backend is %s", tf.getBackend());

const MODEL_URL = url.format({
  pathname: path.join(__dirname, "../models/mobilenet/model.json"),
  protocol: "file:",
  slashes: true,
});

console.log(MODEL_URL);

// TODO: performance: consider using offscreen canvas: https://developers.google.com/web/updates/2018/08/offscreen-canvas

const NUMBER_OF_CHANNELS = 3;
const PROBABILITY_THRESHOLD = 0.1;

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
 * Generate image classification tags for a given imagea above a probability threshold
 * @param {String} imagePath
 * @returns {Array} tags
 */
async function classifyImage(data, context) {
  const tf = require("@tensorflow/tfjs-node");
  console.log(data);
  const pixels = tf.browser.fromPixels(data);
  const smallImg = tf.image.resizeBilinear(pixels, [224, 224]);

  await loadModel();

  console.time("detect");
  const predictions = await net.classify(smallImg);
  console.timeEnd("detect");
  console.log(predictions);
  return predictions;
}
module.exports = {
  loadModel,
  classifyImage,
};
