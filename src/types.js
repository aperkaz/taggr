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
 * @property {string} activeRoute Active page, used as router.
 * @property {string} tagSeachValue Value of tag search
 * @property {Object[]} filteredImageList Filtered images to display in dashboard.
 * @property {Array[Object]} tagCountList ordered list of {tag-name, count} objects.
 */

/**
 * @type {appStoreType} appStore
 */
/**
 * @typedef {Object} appStoreType Reactive store of backend relevant data.
 * @property {string} projectRootFolderPath Path to the current root folder (project).
 * @property {Object} imageHashMap Map of image information, by image hash (from path).
 */
const imageHashMap = { hash1: { path: "path1", tags: ["t1", "t2"] } };
