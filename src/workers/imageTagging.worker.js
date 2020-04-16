const tf = require("@tensorflow/tfjs");

const mobilenet = require("@tensorflow-models/mobilenet");

const fs = require("fs");
const jpeg = require("jpeg-js");

const NUMBER_OF_CHANNELS = 3;

let net;

/**
 * send classfication tags for an image path
 * @param {Object} path image path
 * @returns {Object} { path: imagePath, tags: []}
 */
onmessage = async (e) => {
  let tags = [];
  if (!e.data || !e.data.path) return tags;
  // const image = e.data.image;
  let path = e.data.path;
  path = "/home/alain/Desktop/a/0.jpg";
  console.log(path);

  tags = await classifyImage(path);

  self.postMessage({ path, tags });
};

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
  const tensor3d = tf.tensor3d(values, outShape, "int32");

  // resize to speed up classification
  const resizedInput = tf.image.resizeBilinear(tensor3d, [224, 224]);

  console.timeEnd("imageToInput");
  return resizedInput;
};

async function classifyImage(imgPath) {
  const uintArray = readImage(imgPath);
  const tensor3d = imageToInput(uintArray, NUMBER_OF_CHANNELS);

  console.time("classify");
  const rawPredictions = await net.classify(tensor3d);
  console.timeEnd("classify");
  console.log(rawPredictions);
  return rawPredictions;
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
