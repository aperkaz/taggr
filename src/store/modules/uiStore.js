import { store } from "@risingstack/react-easy-state";
import CONSTANTS from "../../constants";
// TODO: fix non imported types
import "../../types";

/**
 * @type {uiStoreType} uiStore
 */
let uiStore = store({
  currentPage: CONSTANTS.ROUTES.START_PAGE,
  tagProcessingStatus: null,
  filteredImageList: [],
  tagCountList: [], // ordered tagCount object list
});

export default uiStore;
