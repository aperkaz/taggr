const { store, autoEffect } = require("@risingstack/react-easy-state");

/**
 * @type {uiStoreType} uiStore
 */
let uiStore = store({
  currentPage: "START_PAGE",
  tagSearchValue: "",
  filteredImageList: [],
  tagCountMap: {}, // { tag-name: count }
  tagCountList: [], // ordered tagCount object list
});

module.exports = uiStore;
