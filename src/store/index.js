// GLOBAL STATE, https://github.com/nx-js/observer-util
import { store } from "@risingstack/react-easy-state";
import { createWorkers } from "../workers/index";
import actions from "./actions";
import { APP_STATUS } from "../constants";

/**
 * Initialize web workers with store
 *
 */
const initializeWorkersWithStore = () => {
  appStore.workers = createWorkers(actions);
};

let appStore = store({
  appStatus: APP_STATUS.START_PAGE,
  rootFolderPath: null,
  imagePathsList: [],
  imageHashMap: {}, // {imageHash: {tags: [], path: String}}
  tagMap: {},
  tagSearchValue: "",
  imageResults: [], // array of filteres results
  workers: {},
});

export { actions, initializeWorkersWithStore };
export default appStore;
