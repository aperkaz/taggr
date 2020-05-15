import isDev from "electron-is-dev";
import "../types";

const initialState = {
  projectRootFolderPath: "",
  imageHashMap: {},
  stopFlow: false, // TODONOW: super hack, rething flows with queues
};

/**
 * Do not read it directly. ES6 modules imports are read only, so the store imported in other modules remains an outdated copy
 * @type {appStoreType} appStore
 */
let store = { ...initialState };

if (isDev) window["store"] = store;

export const resetStore = () => {
  store = { ...initialState };
  // console.log(store);

  if (isDev) window["store"] = store;
};

export const setProjectRootFolderPath = (projectRootFolderPath) => {
  store.projectRootFolderPath = projectRootFolderPath;
};

export const setImageHashMap = (imageHashMap) => {
  store.imageHashMap = imageHashMap;
};

export const setStopFlow = (value) => {
  store.stopFlow = value;
};

export const getStopFlow = () => store.stopFlow;

export const getImageHashMap = () => store.imageHashMap;
