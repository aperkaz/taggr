import * as nsfwjs from "nsfwjs";

const SEXY_THRESHOLD = 0.6;

// TODONOW: set prod: tf.enableProdMode()

let model;

export async function loadModel() {
  if (model) return;

  console.time("loadModel nsfwjs");
  model = await nsfwjs.load("/quant_mid/", { type: "graph" });
  console.timeEnd("loadModel nsfwjs");
}

/**
 * Analyse is image is sexy, with 224x224 trained model
 * @param {ImageData} imageData
 * @returns {Promise<boolean>}
 */
const isImageSexy = async (imageData) => {
  if (!model) await loadModel();

  //   console.time("predict1");
  let predictions = await model.classify(imageData);
  //   console.timeEnd("predict1");
  console.log("Predictions: ", predictions);

  const sexyPrediction = predictions.find((p) => p.className === "Sexy");

  return sexyPrediction.probability > SEXY_THRESHOLD;
};

export default isImageSexy;
