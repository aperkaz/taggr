import * as Comlink from "comlink";
import { classifyImage } from "../imageRecognition/classification";

// TODO: improvement. move code here

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
