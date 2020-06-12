const tf = require("@tensorflow/tfjs-node");

const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

/**
 * Generate a Uint8Array from a imagePath.
 *
 * @param {string} path
 * @returns {Promise<Uint8Array>} loaded image
 */
const loadImageAsUint8Array = async (path) => {
  const image = await readFile(path);
  const buf = Buffer.from(image);
  return new Uint8Array(buf);
};

/**
 * Generate tfjs tensor from a uint8Array from an image
 *
 * @param {Uint8Array} uint8Array
 * @returns {Promise<any>} loaded image
 */
const getImageTensor = async (uint8Array) => {
  return await tf.node.decodeImage(uint8Array);
};

module.exports = {
  loadImageAsUint8Array,
  getImageTensor,
};
