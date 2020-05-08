import isDev from "electron-is-dev";
import "./types";

/**
 * @type {appStoreType} appStore
 */
let store = {
  projectRootFolderPath: "",
  imageHashMap: {},
};

if (isDev) window["store"] = store;

export default store;
