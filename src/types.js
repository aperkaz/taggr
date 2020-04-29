// Inspiration: https://medium.com/@trukrs/type-safe-javascript-with-jsdoc-7a2a63209b76
// Setup: add `"javascript.implicitProjectConfig.checkJs": true` to VSCode settings

/**
 * @type {ActionType} action
 */
/**
 * @typedef {Object} ActionType The Options to use in the function createUser.
 * @property {string} type Type of action.
 * @property {Object} payload Payload object.
 */

/**
 * @type {uiStoreType} uiStore
 */
/**
 * @typedef {Object} uiStoreType Reactive store of UI relevant data.
 * @property {string} currentPage Active page, used as router.
 * @property {Object[]} filteredImageList Filtered images to display in dashboard.
 * @property {String} tagProcessingStatus current status of processing
 * @property {Array[Object]} tagCountList ordered list of {tag-name, count} objects.
 */

/**
 * @type {appStoreType} appStore
 */
/**
 * @typedef {Object} appStoreType Reactive store of UI relevant data.
 * @property {string} projectRootFolderPath Current root folder path (project).
 * @property {Object} imageHashMap Map of image information, by image hash (from path).
 */
const imageHashMap = { hash1: { path: "path1", tags: ["t1", "t2"] } };
