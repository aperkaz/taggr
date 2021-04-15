/**
 * @typedef {Object} ImageType
 * @property {string} hash
 * @property {string} path
 * @property {string} rawPath
 * @property {string[]} tags ML tags
 * @property {{latitude: number,longitude: number}} location
 * @property {number|null} creationDate
 */

/**
 * @typedef {Object<string,ImageType>} ImageHashMapType
 */

/**
 * @argument {ImageType} imageArgs
 * @returns {ImageType}
 */
export const ImageFactory = (imageArgs) => ({ ...imageArgs });

/**
 * @returns {ImageHashMapType}
 */
export const ImageHashMapFactory = () => {
  return {};
};
