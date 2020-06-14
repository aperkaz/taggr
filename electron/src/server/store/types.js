// Inspiration: https://medium.com/@trukrs/type-safe-javascript-with-jsdoc-7a2a63209b76
// Setup: add `"javascript.implicitProjectConfig.checkJs": true` to VSCode settings
// Objects: https://stackoverflow.com/questions/19513955/how-to-document-a-dictionary-in-jsdoc

/**
 * @type {AppStoreType} appStore
 */
/**
 * @typedef {Object} AppStoreType Reactive store of backend relevant data.
 * @property {string} projectRootFolderPath Path to the current root folder (project).
 * @property {Object} imageHashMap Map of image information, by image hash (from path).
 * @property {Object[]} flows array of active flows
 */

/**
 * @type {ImageHashMapType} imageHashMap
 */
/**
 * @typedef {Object<string,ImageDataType>} ImageHashMapType main structure for image storage
 * @typedef {Object} ImageDataType main structure for image storage
 * @property {string} hash
 * @property {string} path prefixed by file://
 * @property {string} rawPath
 * @property {string[]} tags
 * @property {Object} location
 */
const example = {
  hash: {
    path: "file:///path1",
    rawPath: "path1",
    tags: ["t1", "t2"],
    location: { lat: "", long: "" },
  },
};
