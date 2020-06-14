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
 * @returns {any} loaded image
 */
const getImageTensor = (uint8Array) => {
  let imageTensor;

  try {
    imageTensor = tf.tidy(() => {
      return tf.node.decodeImage(uint8Array);
    });
  } catch (e) {
    // console.log(e);
    // TODO: Sentry. report console.error();
    // creates emtpy tensor when error
    imageTensor = tf.zeros([0, 0, 0, 0]);
  }
  console.log("jeff");

  return imageTensor;
};

module.exports = {
  loadImageAsUint8Array,
  getImageTensor,
};
