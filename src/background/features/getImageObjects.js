const tf = require("@tensorflow/tfjs");
tf.enableProdMode();
const cocoSsd = require("@tensorflow-models/coco-ssd");

const MIN_SCORE = 0.5;

let net;

export const loadModel = async () => {
  console.time("loadModel coco-ssd");
  net = await cocoSsd.load("lite_mobilenet_v2");
  console.timeEnd("loadModel coco-ssd");
};

const getObjects = async (imageData) => {
  // TODO: research why runing in node?
  tf.setBackend("webgl");
  console.log(tf.env());
  const objects = [];

  console.time("detect objects");
  const predictions = await net.detect(imageData);

  predictions.forEach((prediction) => {
    const score = prediction.score;
    const predictedClass = prediction.class;
    if (score > MIN_SCORE) {
      objects.push({ name: predictedClass, score });
    }
  });
  console.timeEnd("detect objects");

  return objects;
};

/**
 * Get objects in an image
 * @param {ImageData} imageData
 */
const getImageObjects = async (imageData) => {
  return await getObjects(imageData);
};

export default getImageObjects;
