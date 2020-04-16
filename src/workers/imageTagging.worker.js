// if (typeof OffscreenCanvas !== "undefined") {
//   self.document = {
//     createElement: () => {
//       return new OffscreenCanvas(640, 480);
//     },
//   };
//   self.window = self;
//   self.screen = {
//     width: 640,
//     height: 480,
//   };
//   self.HTMLVideoElement = function () {};
//   self.HTMLImageElement = function () {};
//   self.HTMLCanvasElement = OffscreenCanvas;
// }

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

async function classifyImage(imgPath) {
  // console.time("detect" + imgPath);
  const image = readImage(imgPath);
  const input = imageToInput(image, NUMBER_OF_CHANNELS);

  // await loadModel();

  const rawPredictions = await net.classify(input);
  console.log(rawPredictions);
  // console.timeEnd("detect" + imgPath);
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
