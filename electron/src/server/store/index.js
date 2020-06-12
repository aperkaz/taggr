const isDevInWindow = false;

// TODONOW: fix types
// require("../types");

const initialState = {
  projectRootFolderPath: "",
  imageHashMap: {},
  flows: [],
};

/**
 * Do not read it directly. ES6 modules imports are read only, so the store imported in other modules remains an outdated copy
 * @type {AppStoreType} appStore
 */
let store = { ...initialState };

if (isDevInWindow) window["store"] = store;

const resetStore = () => {
  store = { ...initialState };

  if (isDevInWindow) window["store"] = store;
};

const setProjectRootFolderPath = (projectRootFolderPath) => {
  store.projectRootFolderPath = projectRootFolderPath;
};

const getImageHashMap = () => store.imageHashMap;

const setImageHashMap = (imageHashMap) => {
  store.imageHashMap = imageHashMap;
};

const addFlow = (flow) => {
  store.flows.push(flow);
};

const deleteFlows = () => (store.flows = []);

const stopFlows = () => {
  store.flows.forEach((flow) => {
    flow.stop();
  });
  deleteFlows();
};

module.exports = {
  resetStore,
  setProjectRootFolderPath,
  getImageHashMap,
  setImageHashMap,
  addFlow,
  deleteFlows,
  stopFlows,
};
