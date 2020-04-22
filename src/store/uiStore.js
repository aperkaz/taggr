const { store, autoEffect } = require("@risingstack/react-easy-state");

// TODONOW: add debug to store
// https://github.com/RisingStack/react-easy-state/issues/14#issuecomment-499425828

/**
 * @type {uiStoreType} appStore
 */
let uiStore = store({
  currentPage: "START_PAGE",
  tagSearchValue: "",
  filteredImageList: [],
  tagCountMap: {}, // { tag-name: count }
});

autoEffect(() => console.log("tagCountMap: ", this.tagCountMap));

module.exports = uiStore;
