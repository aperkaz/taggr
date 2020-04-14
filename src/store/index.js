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

  workers.recursiveImageFinderWorker.onmessage = ({ data }) => {
    actions.setImagePathsList(data.imagePathsList);
    actions.triggerImageTagsCalculation(data.imagePathsList);
  };

  workers.imageTaggingWorker.onmessage = ({ data }) => {
    actions.setImageTags(data.path, data.tags);
  };
};

// TODO: separate pure UI and storage data structuresnpm i opencv4nodejs
export default store({
  appStatus: APP_STATUS.START_PAGE,
  rootFolderPath: null,
  imagePathsList: [],
  imageHashMap: {}, // {imageHash: {tags: [], path: String}}
  tagMap: {},
  tagSearchValue: "",
  imageList: [
    {
      hash: "13",
      path:
        "https://images.unsplash.com/photo-1578922746465-3a80a228f223?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80",
      tags: ["cat", "dog"],
    },
    {
      hash: "14",
      path:
        "https://images.unsplash.com/photo-1582449632319-5247b79dd198?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80",
      tags: ["cat", "dog"],
    },
  ], // array of filteres results
});

export { actions, workers, initializeWorkersWithStore };
