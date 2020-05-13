import isDev from "electron-is-dev";
import "../types";

const initialState = {
  projectRootFolderPath: "",
  imageHashMap: {},
};

/**
 * @type {appStoreType} appStore
 */
let store = { ...initialState };

if (isDev) window["store"] = store;

export const resetStore = () => {
  console.log("resetting store");
  store = { ...initialState };
  console.log(store);

  if (isDev) window["store"] = store;
};

export default store;
