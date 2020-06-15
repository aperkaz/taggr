// Inspiration: https://medium.com/@trukrs/type-safe-javascript-with-jsdoc-7a2a63209b76
// Setup: add `"javascript.implicitProjectConfig.checkJs": true` to VSCode settings
// Define objects: https://stackoverflow.com/questions/6460604/how-to-describe-object-arguments-in-jsdoc

/**
 * @type {AppStoreType}
 */
/**
 * @typedef {Object} AppStoreType Reactive store of backend relevant data.
 * @property {string} projectRootFolderPath Path to the current root folder (project).
 * @property {ImageHashMapType} imageHashMap Map of image information, by image hash (from path).
 */

/**
 * @type {ImageHashMapType}
 */
/**
 * @typedef {Object<string,ImageType>} ImageHashMapType
 */
const imageHashType = {
  hash: {
    path: "file:///path1",
    rawPath: "path1",
    tags: ["t1", "t2"],
    location: { lat: 123, long: 2341 },
  },
};

/**
 * @type {ImageType}
 */
/**
 * @typedef {Object} ImageType
 * @property {string} hash
 * @property {string} path
 * @property {string} rawPath
 * @property {string[]} tags
 * @property {{latitude: number,longitude: number}} location
 * @property {number|null} creationDate
 */

/**
 * @type {TaskType}
 */
/**
 * @typedef {Object} TaskType
 * @property {boolean} isOngoing
 * @property {string} [name]
 * @property {number} [percentage]
 */

/**
 * @type {FilterType}
 */
/**
 * @typedef {Object} FilterType
 * @property {number} fromDate
 * @property {number} toDate
 * @property {string[]} tags
 */
