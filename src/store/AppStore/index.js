// Non-reactive store to store data stuct supporting expensive computations and dictionaries.
// In the future it will be connected to a database(couchDB?)

import { createWorkers } from "../../workers";
import * as actions from "./actions";

let AppStore = {
  rootFolderPath: null,
  rootFolderImagesPathList: [],
  imageHashMap: {}, // {imageHash: {tags: [], path: String}}
  tagMap: {}, // {tag: imageHash}
  workers: {},
};

AppStore["initializeWorkers"] = () => {
  AppStore.workers = createWorkers(actions);
};

export default AppStore;
export { actions };
