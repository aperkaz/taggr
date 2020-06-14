require("./types");

// TODO: extract to env variable
const isDevInWindow = false;

/**
 * @type {AppStoreType} initialState
 */
const initialState = {
  projectRootFolderPath: "",
  imageHashMap: {},
  flows: [],
};

/**
 * Store for the Backend.
 * Do not read it directly.
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

/**
 * Long running operatoins in the backend are called Flows (ex. image processing)
 * @param {any} flow
 */
const addFlow = (flow) => {
  store.flows.push(flow);
};

const stopFlows = () => {
  store.flows.forEach((flow) => {
    flow.stop();
  });
  deleteFlows();
};

const deleteFlows = () => (store.flows = []);

module.exports = {
  resetStore,
  setProjectRootFolderPath,
  getImageHashMap,
  setImageHashMap,
  addFlow,
  stopFlows,
  deleteFlows,
};
