const { ACTIONS } = require("./actions");

// Resolvers are async functions with access to persistence, filesystem, webworkers... 
let resolver = {};

resolver[ACTIONS.SET_CURRENT_PAGE] = require("./resolvers/setCurrentPage");
resolver[ACTIONS.SET_ROOT_FOLDER_PATH] = require("./resolvers/setRootFolderPath");
resolver[ACTIONS.CALCULATE_IMAGE_PATHS_IN_ROOT] = require('./resolvers/calculateImagePathsInRoot');
resolver[ACTIONS.SET_IMAGE_PATHS_IN_MAP] = require('./resolvers/setImagePathsInMap'); 
resolver[ACTIONS.CALCULATE_IMAGE_TAGS] = require('./resolvers/calculateImageTags'); 
resolver[ACTIONS.SET_IMAGE_TAGS_IN_MAP] = require('./resolvers/setImageTagsInMap'); 
resolver[ACTIONS.SET_IMAGE_TAGS_IN_COUNTER] = require('./resolvers/setImageTagsInCounter'); 
resolver[ACTIONS.SET_IMAGE_FILTER_TAG_SEARCH_VALUE] = require('./resolvers/setImageFilterTagSearchValue'); 


/**
 * Component interfacing between the UI and backend-processes, aka resolvers.
 * When an action is fired by the FE, the processor assigns to its resolver.
 * 
 * @param {Object} modules 
 */
const processor = (modules) => async ({ type, payload }) => {
  console.log(`P: ${type} : ${JSON.stringify(payload)}`);

  await resolver[type](modules, payload);
};


const withStore = () => {
  const uiStore = require("../store/modules/uiStore");
  const appStore = require("../store/modules/appStore");
  return processor({uiStore, appStore})
}

module.exports = { vanilla: processor, withStore: withStore() };
