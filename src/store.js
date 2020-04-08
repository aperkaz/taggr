const { observable } = require("@nx-js/observer-util");

// Global state, reactive with https://github.com/nx-js/observer-util
let store = observable({
  appStatus: "OPEN", // ['OPEN', 'READY']
  rootFolderPath: "default",
  imagePathsList: [],
  imageHashMap: {},
});

module.exports = store;
