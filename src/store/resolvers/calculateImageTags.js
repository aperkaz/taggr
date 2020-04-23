// TODONOW: move to helpers
const calculateImageTags = (payload) => {
  const {
    generateMD5Hash,
    imageTaggingQueuExecutor,
    Queue,
  } = require("../../utils");
  const { getWorkers } = require("../../workers/index");
  const workers = getWorkers();

  // set worker callback
  workers.imageTaggingWorker.onmessage = async ({ data }) => {
    console.log(data);
    // await triggerAction({
    //   type: ACTIONS.SET_IMAGE_TAGS_IN_MAP,
    //   payload: { imageHash: generateMD5Hash(data.path), tags: data.tags },
    // });

    // await triggerAction({
    //   type: ACTIONS.SET_IMAGE_TAGS_IN_COUNTER,
    //   payload: { tags: data.tags },
    // });
  };

  const imageRenderingQueue = new Queue(
    imageTaggingQueuExecutor(workers.imageTaggingWorker)
  );

  payload.forEach(
    async (imagePath) => await imageRenderingQueue.add(imagePath)
  );
};

module.exports = calculateImageTags;
