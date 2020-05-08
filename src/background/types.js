// Inspiration: https://medium.com/@trukrs/type-safe-javascript-with-jsdoc-7a2a63209b76
// Setup: add `"javascript.implicitProjectConfig.checkJs": true` to VSCode settings

/**
 * @type {appStoreType} appStore
 */
/**
 * @typedef {Object} appStoreType Reactive store of backend relevant data.
 * @property {string} projectRootFolderPath Path to the current root folder (project).
 * @property {Object} imageHashMap Map of image information, by image hash (from path).
 */
const imageHashMap = { hash1: { path: "path1", tags: ["t1", "t2"] } };
