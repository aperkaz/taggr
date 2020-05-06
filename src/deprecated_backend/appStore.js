import isDev from "electron-is-dev";
import "../types";

/**
 * @type {appStoreType} appStore
 */
let appStore = {
  projectRootFolderPath: "",
  imageHashMap: {},
};

if (isDev) window["appStore"] = appStore;

export default appStore;
