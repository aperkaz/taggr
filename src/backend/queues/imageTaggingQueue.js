import queue from "async/queue";
import appStore from "../appStore";
import { generateImageData } from "../../utils";

// TODONOW: remove in favor of backend process
const imageTaggingQueue = queue(
  async ({ imageHash, imageTaggingWorker }, callback) => {
    const path = appStore.imageHashMap[imageHash].path;

    // let imageData = await generateImageData(path);

    // const tags = await imageTaggingWorker.process(imageData);
    const tags = [];

    // save results in appStore
    appStore.imageHashMap[imageHash] = {
      ...appStore.imageHashMap[imageHash],
      tags,
    };

    // imageData = null;
    return callback(false);
  },
  // with parallelism, they use the same worker thread: https://github.com/caolan/async/issues/1687
  1
);

export default imageTaggingQueue;
