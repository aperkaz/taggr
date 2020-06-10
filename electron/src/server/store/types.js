// Inspiration: https://medium.com/@trukrs/type-safe-javascript-with-jsdoc-7a2a63209b76
// Setup: add `"javascript.implicitProjectConfig.checkJs": true` to VSCode settings

/**
 * @type {AppStoreType} appStore
 */
/**
 * @typedef {Object} AppStoreType Reactive store of backend relevant data.
 * @property {string} projectRootFolderPath Path to the current root folder (project).
 * @property {Object} imageHashMap Map of image information, by image hash (from path).
 * @property {Object[]} flows array of active flows
 */
const imageHashMap = {
  hash1: {
    path: "file:///path1",
    rawPath: "path1",
    tags: ["t1", "t2"],
    location: { lat: "", long: "" },
  },
};

// https://stackoverflow.com/questions/19513955/how-to-document-a-dictionary-in-jsdoc
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

/**
 * @type {messageType} message
 */
/**
 * @typedef {Object} messageType Message to pass over IPC between windows.
 * @property {number=} senderId id of the sennder process (rederer, background, main). Added by helpers.
 * @property {string} type type of message action. Either redux action or background acitons.
 * @property {Object} payload Object with the required data to perform the type action.
 */
const exampleMessage = {
  senderId: 4,
  type: "CREATE_PROJECT",
  payload: "project/root",
};
