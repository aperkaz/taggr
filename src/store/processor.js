const uiStore = require("../store/modules/uiStore");
const appStore = require("../store/modules/appStore");
// @ts-ignore
require("../types");

/**
 * Process action by triggering side-effects
 * Interface between UI and filesystem, DB, workers...
 *
 * @param {uiStoreType} uiStore
 * @param {appStoreType} appStore
 */
const processor = (uiStore, appStore) => async ({ type, payload }) => {
  const Comlink = require("comlink");
  const { ACTIONS, triggerAction } = require("./actions");
  const { getWorkers } = require("../workers/index");
  const { generateMD5Hash, imageTaggingQueuExecutor } = require("../utils");
  const workers = getWorkers();

  console.log(`P: ${type} : ${JSON.stringify(payload)}`);

  switch (type) {
    case ACTIONS.SET_CURRENT_PAGE:
      uiStore.currentPage = payload;
      break;

    case ACTIONS.SET_ROOT_FOLDER_PATH:
      appStore.rootFolderPath = payload;
      break;

    case ACTIONS.CALCULATE_IMAGE_PATHS_IN_ROOT:
      const imageFinderWorker = Comlink.wrap(
        workers.recursiveImageFinderWorker
      );

      // @ts-ignore-next-line
      let list = await imageFinderWorker.process(payload);

      await triggerAction({
        type: ACTIONS.SET_IMAGE_PATHS_IN_MAP,
        payload: list,
      });

      await triggerAction({
        type: ACTIONS.SET_IMAGE_FILTER_TAG_SEARCH_VALUE,
        payload: "",
      });

      await triggerAction({
        type: ACTIONS.CALCULATE_IMAGE_TAGS,
        payload: list,
      });

      break;

    case ACTIONS.SET_IMAGE_PATHS_IN_MAP:
      payload.forEach((imagePath) => {
        const imageHash = generateMD5Hash(imagePath);

        appStore.imageHashMap[imageHash] = {
          path: imagePath,
          hash: imageHash,
          tags: null,
        };
      });
      break;

    case ACTIONS.CALCULATE_IMAGE_TAGS:
      console.log("calculate image tags");

      // set worker callback
      workers.imageTaggingWorker.onmessage = async ({ data }) => {
        console.log(data);
        await triggerAction({
          type: ACTIONS.SET_IMAGE_TAGS_IN_MAP,
          payload: { imageHash: generateMD5Hash(data.path), tags: data.tags },
        });

        await triggerAction({
          type: ACTIONS.SET_IMAGE_TAGS_IN_COUNTER,
          payload: { tags: data.tags },
        });

        console.log(uiStore.tagCountMap);
      };

      const { Queue } = require("../utils");
      const imageRenderingQueue = new Queue(
        imageTaggingQueuExecutor(workers.imageTaggingWorker)
      );

      payload.forEach(
        async (imagePath) => await imageRenderingQueue.add(imagePath)
      );

      break;

    case ACTIONS.SET_IMAGE_TAGS_IN_MAP:
      const { imageHash, tags } = payload;

      appStore.imageHashMap[imageHash].tags = tags;
      break;

    case ACTIONS.SET_IMAGE_TAGS_IN_COUNTER:
      console.log("about to set tags: ", payload);
      payload.tags.forEach((tag) => {
        let count = uiStore.tagCountMap[tag] ? uiStore.tagCountMap[tag] : 0;
        uiStore.tagCountMap[tag] = ++count;

        //check if tag is already present in results array
        const isTagBeingCounted = uiStore.tagCountList.some(
          (tagCount, index) => {
            if (tagCount.name === tag) {
              uiStore.tagCountList[index].count++;
              return true;
            }
          }
        );

        if (!isTagBeingCounted) {
          // if tag is not present in result array, add
          uiStore.tagCountList.push({ name: tag, count: 1 });
        }
      });

      // Object.keys(uiStore.tagCountMap).forEach((tagName) => {

      // const count = uiStore.tagCountMap[tagName];
      // });

      break;

    case ACTIONS.SET_IMAGE_FILTER_TAG_SEARCH_VALUE:
      const searchValue = payload;

      uiStore.tagSearchValue = searchValue;

      const filteredImages = [];
      let found = 0; // only calculate the first 200 tag matches

      // TODO: refactor and clean up
      Object.keys(appStore.imageHashMap).some((key) => {
        const tags = appStore.imageHashMap[key].tags;
        if (searchValue === "") {
          filteredImages.push(appStore.imageHashMap[key]);

          found++;
        } else {
          if (
            tags &&
            tags.filter((tag) => tag.includes(searchValue)).length > 0
          ) {
            filteredImages.push(appStore.imageHashMap[key]);

            found++;
          }
        }

        if (found > 200) {
          return true;
        }
      });

      uiStore.filteredImageList = filteredImages;
      break;

    default:
      console.error(`${type} action has no reducer`);
  }
};

const processorWrapper = processor(uiStore, appStore);

module.exports = { vanilla: processor, withStore: processorWrapper };
