global.fetch = require("node-fetch");

const tf = require("@tensorflow/tfjs");
const mobilenet = require("@tensorflow-models/mobilenet");

const fs = require("fs");
const jpeg = require("jpeg-js");

const NUMBER_OF_CHANNELS = 3;

let net;

let queue = [];
let busy = false;

/**
 * send classfication tags for an image path
 * @param {Object} path image path
 * @returns {Object} { path: imagePath, tags: []}
 */
onmessage = async (e) => {
  if (busy) {
    queue.push(e);
  } else {
    busy = true;
    await processMessage(e);
  }
};

async function processMessage(e) {
  let tags = [];
  if (!e.data || !e.data.path) return tags;
  let path = e.data.path;

  // TODO: issue with memory leak by serializaiton package
  // tags = await classifyImage(path);
  tags = ["dog"];

  self.postMessage({ path, tags });

  if (queue.length) {
    await processMessage(queue.shift());
  } else {
    busy = false;
  }
}

// ML utils

function readImage(path) {
  console.time("readImage");

  let buf = fs.readFileSync(path);
  console.log(buf);
  let uintArray = jpeg.decode(buf, true);
  return uintArray;
}

function imageByteArray(image, numChannels) {
  let pixels = image.data;
  let numPixels = image.width * image.height;
  let values = new Int32Array(numPixels * numChannels);

  for (let i = 0; i < numPixels; i++) {
    for (let channel = 0; channel < numChannels; ++channel) {
      values[i * numChannels + channel] = pixels[i * 4 + channel];
    }
  }

  return values;
}

function imageToInput(image, numChannels) {
  console.time("imageToInput");
  let int32array = imageByteArray(image, numChannels);
  let outShape = [image.height, image.width, numChannels];
  let tensor3d = tf.tensor3d(int32array, outShape, "int32");

  // resize to speed up classification
  const resizedInput = tf.image.resizeBilinear(tensor3d, [224, 224]);

  console.timeEnd("imageToInput");
  return resizedInput;
}

async function classifyImage(imgPath) {
  let uintArrayRet = await readImage(imgPath);
  let inputTensor3d = imageToInput(uintArrayRet, NUMBER_OF_CHANNELS);

  console.time("classify");
  const predictions = await net.classify(inputTensor3d);
  console.timeEnd("classify");
  console.log(predictions);
  return predictions;
}

// load the required tensorflow.js models required by the worker
(async () => {
  try {
    net = await mobilenet.load();
    console.log("model loaded");
  } catch (err) {
    console.log(err);
  }
})();
