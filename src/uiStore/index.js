import { store } from "@risingstack/react-easy-state";
import CONSTANTS from "../constants";
import "../types";

/**
 * @type {uiStoreType} uiStore
 */
let uiStore = store({
  currentPage: CONSTANTS.ROUTES.START_PAGE,
  tagProcessingStatus: null,
  filteredImageList: [],
  tagCountList: [], // ordered tagCount object list
});

// UI actions, to be processed by the backend processor
export const ACTIONS = {
  SET_UI_PAGE: "SET_UI_PAGE",
  CREATE_PROJECT: "CREATE_PROJECT",
  FILTER_RESULTS_BY_TAG: "FILTER_RESULTS_BY_TAG",
};

export default uiStore;
