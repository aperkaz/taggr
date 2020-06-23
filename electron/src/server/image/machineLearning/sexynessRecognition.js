// TODO: legacy code
// import * as nsfwjs from "nsfwjs";

// const SEXY_THRESHOLD = 0.9;

// let model;

// export async function loadModel() {
//   if (model) return;

//   console.time("loadModel sexy");
//   model = await nsfwjs.load();
//   console.timeEnd("loadModel sexy");
// }

// /**
//  * Analyse is image is sexy, with 224x224 trained model
//  * @param {ImageData} imageData
//  * @returns {Promise<boolean>}
//  */
// const isImageSexy = async (imageData) => {
//   if (!model) await loadModel();

//   let predictions = await model.classify(imageData);
//   const sexyPrediction = predictions.find((p) => p.className === "Sexy");

//   return sexyPrediction.probability > SEXY_THRESHOLD;
// };

// export default isImageSexy;
