const Comlink = require("comlink");
const { getWorkers } = require("../../workers/index");

const filterResultsByTag = async (modules, payload) => {
  const workers = getWorkers();

  // Worker: calculate resul set
  const filterResultsWorker = Comlink.wrap(workers.filterResulsWorker);
  let results = await filterResultsWorker.process(
    modules.appStore.imageHashMap,
    payload
  );

  modules.uiStore.filteredImageList = results;
};

module.exports = filterResultsByTag;
