import { store, autoEffect } from "@risingstack/react-easy-state";
import isDev from "electron-is-dev";
import CONSTANTS from "../constants";
import "../types";

/**
 * @type {uiStoreType} uiStore
 */
let uiStore = store({
  activeRoute: CONSTANTS.ROUTES.START_PAGE,
  // Tasks
  tagProcessingStatus: null,

  // Dashboard page
  tagSeachValue: "",
  filteredImageList: [],
  tagCountList: [], // ordered tagCount object list
});

autoEffect(() => console.log(uiStore.filteredImageList.length));

if (isDev) window["uiStore"] = uiStore;

// UI actions, to be processed by the backend processor
export const ACTIONS = {
  SET_UI_ROUTE: "SET_UI_ROUTE",
  CREATE_PROJECT: "CREATE_PROJECT",
  FILTER_RESULTS_BY_TAG: "FILTER_RESULTS_BY_TAG",
};

export default uiStore;
