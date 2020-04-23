const { store } = require("@risingstack/react-easy-state");
// @ts-ignore
require("../../types");

/**
 * @type {uiStoreType} uiStore
 */
let uiStore = store({
  currentPage: "START_PAGE",
  filteredImageList: [],
  tagCountList: [], // ordered tagCount object list
});

module.exports = uiStore;
