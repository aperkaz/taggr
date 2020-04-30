import * as Comlink from "comlink";
import FilterResultsWorker from "../../workers/filderResults.worker";

const filterResultsByTag = async (modules, payload) => {
  // Worker: calculate resul set
  const filterResultsWorker = Comlink.wrap(new FilterResultsWorker());
  let results = await filterResultsWorker.process(
    modules.appStore.imageHashMap,
    payload
  );

  modules.uiStore.filteredImageList = results;
};

export default filterResultsByTag;
