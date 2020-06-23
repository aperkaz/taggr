const tf = require("@tensorflow/tfjs-node");

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
    // TODONOW: Sentry. report console.error();
    // creates emtpy tensor when error
    imageTensor = tf.zeros([0, 0, 0, 0]);
  }

  return imageTensor;
};

module.exports = { getImageTensor };
