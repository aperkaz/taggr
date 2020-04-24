const appStore = require("./modules/appStore");
const uiStore = require("./modules/uiStore");

const initializeStores = () => {
  // add to global window object for further debug
  window["appStore"] = appStore;
  window["uiStore"] = uiStore;
};

module.exports = initializeStores;
