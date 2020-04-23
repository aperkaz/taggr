const { ACTIONS } = require("./actions");

// Resolvers are async functions with access to persistence, filesystem, webworkers... 
let resolver = {};

resolver[ACTIONS.SET_UI_PAGE] = require("./resolvers/setUiPage");
resolver[ACTIONS.CREATE_PROJECT]= async(m,p)=> await require('./resolvers/createProject')(m,p)
resolver[ACTIONS.FILTER_RESULTS_BY_TAG]= require('./resolvers/filterResultsByTag')

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
