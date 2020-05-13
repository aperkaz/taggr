import isDev from "electron-is-dev";
import "../types";

const initialState = {
  projectRootFolderPath: "",
  imageHashMap: {},
};

/**
 * @type {appStoreType} appStore
 */
let store = initialState;

if (isDev) window["store"] = store;

export const resetState = () => (store = initialState);

export default store;
