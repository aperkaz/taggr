const { store } = require("@risingstack/react-easy-state");

/**
 * @type {uiStoreType} appStore
 */
let uiStore = store({
  currentPage: "START_PAGE",
  tagSearchValue: "",
  filteredImageList: [],
});

module.exports = uiStore;
