import * as Comlink from "comlink";
import classifyImage, { loadModel } from "./tfImageClassification";

Comlink.expose({
  /**
   * Extract classification tags from ImageData
   *
   * @param {ImageData} imageData
   * @returns tags list of classification tags
   */
  async process(imageData) {
    return await classifyImage(imageData);
  },
});

// TODONOW: clean up
// load model at the start of app
(async () => {
  // await loadModel();
})();
