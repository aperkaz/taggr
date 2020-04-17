const { store, autoEffect } = require("@risingstack/react-easy-state");
const CONSTANTS = require("../constants");

let uiStore = store({
  appStatus: CONSTANTS.APP_STATUS.START_PAGE, // ['START_PAGE', 'DASHBOARD_PAGE']
  rootFolderPath: "",
  tagSearchValue: "",
  imageResults: [], // array of filteres results
});

const actions = {
  setRootFolderPath: (path) => (uiStore.rootFolderPath = path),
  setAppStatus: (status) => (uiStore.appStatus = status),
};

autoEffect(() => console.log(uiStore.rootFolderPath));

module.exports = { uiStore, actions };
