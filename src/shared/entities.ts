/* eslint-disable */
// @ts-nocheck
// TODONOW: add types

/**
 * @typedef {Object} ImageType
 * @property {string} hash
 * @property {string} path
 * @property {string} rawPath
 * @property {string[] | null} tags ML tags
 * @property {{latitude: number,longitude: number} | null} location
 * @property {number | null} creationDate
 */

/**
 * @typedef {Object<string,ImageType>} ImageHashMapType
 */

/**
 * @argument {ImageType} imageArgs
 * @returns {ImageType}
 */
export const ImageFactory = ({ hash, path, rawPath }) => ({
  hash,
  path,
  rawPath,
  tags: null,
  location: null,
  creationDate: null,
});

/**
 * @returns {ImageHashMapType}
 */
export const ImageHashMapFactory = () => {
  return {};
};
