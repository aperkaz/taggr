// GLOBAL STATE, https://github.com/nx-js/observer-util
import { store } from "@risingstack/react-easy-state";
import { createWorkers } from "../workers/index";
import { APP_STATUS } from "../constants";
import actions from "./actions";

/**
 * Initialize web workers
 *
 */
let workers = {};

const initializeWorkersWithStore = () => {
  workers = createWorkers(actions);
};

export default appStore = store({
  appStatus: APP_STATUS.DASHBOARD_PAGE,
  rootFolderPath: null,
  imagePathsList: [],
  imageHashMap: {}, // {imageHash: {tags: [], path: String}}
  tagMap: {},
  tagSearchValue: "",
  imageList: [], // array of filteres results
});

export { actions, workers, initializeWorkersWithStore };
