import isDev from "electron-is-dev";
import "../types";

const initialState = {
  projectRootFolderPath: "",
  imageHashMap: {},
  flows: [],
};

/**
 * Do not read it directly. ES6 modules imports are read only, so the store imported in other modules remains an outdated copy
 * @type {appStoreType} appStore
 */
let store = { ...initialState };

if (isDev) window["store"] = store;

export const resetStore = () => {
  store = { ...initialState };

  if (isDev) window["store"] = store;
};

export const setProjectRootFolderPath = (projectRootFolderPath) => {
  store.projectRootFolderPath = projectRootFolderPath;
};

export const setImageHashMap = (imageHashMap) => {
  store.imageHashMap = imageHashMap;
};

export const addFlow = (flow) => {
  store.flows.push(flow);
};

export const deleteFlows = () => (store.flows = []);

export const stopFlows = () => {
  store.flows.forEach((flow) => {
    flow.stop();
  });
  deleteFlows();
};

export const getImageHashMap = () => store.imageHashMap;
