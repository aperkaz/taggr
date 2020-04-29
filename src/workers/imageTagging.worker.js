import * as Comlink from "comlink";
import classifyImage from "./tfImageClassification";

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
