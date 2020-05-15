// Inspiration: https://medium.com/@trukrs/type-safe-javascript-with-jsdoc-7a2a63209b76
// Setup: add `"javascript.implicitProjectConfig.checkJs": true` to VSCode settings

/**
 * @type {appStoreType} appStore
 */
/**
 * @typedef {Object} appStoreType Reactive store of backend relevant data.
 * @property {string} projectRootFolderPath Path to the current root folder (project).
 * @property {Object} imageHashMap Map of image information, by image hash (from path).
 * @property {boolean} stopFlow TODONOW: temporary flag for stopping the execution of flows
 */
const imageHashMap = {
  hash1: {
    path: "file:///path1",
    rawPath: "path1",
    tags: ["t1", "t2"],
    location: { lat: "", long: "" },
  },
};

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
