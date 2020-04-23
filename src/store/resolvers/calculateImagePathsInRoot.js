// TODONOW: add tests to resolvers
const calculateImagePathInRoot = async (modules, payload) => {
  const Comlink = require("comlink");
  const { getWorkers } = require("../../workers/index");
  const workers = getWorkers;

  const imageFinderWorker = Comlink.wrap(workers.recursiveImageFinderWorker);

  // @ts-ignore-next-line
  let list = await imageFinderWorker.process(payload);

  //   await triggerAction({
  //     type: ACTIONS.SET_IMAGE_PATHS_IN_MAP,
  //     payload: list,
  //   });

  //   await triggerAction({
  //     type: ACTIONS.SET_IMAGE_FILTER_TAG_SEARCH_VALUE,
  //     payload: "",
  //   });

  //   await triggerAction({
  //     type: ACTIONS.CALCULATE_IMAGE_TAGS,
  //     payload: list,
  //   });
};

module.exports = calculateImagePathInRoot;
