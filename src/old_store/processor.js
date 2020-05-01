import { ACTIONS } from "./actions";
import uiStore from "./modules/uiStore";
import appStore from "./modules/appStore";
import setUiPage from "./resolvers/setUiPage";
import createProject from "./resolvers/createProject";
import filterResultsByTag from "./resolvers/filterResultsByTag";

let resolver = {};

// Resolvers are async functions with access to persistence, filesystem, webworkers...
resolver[ACTIONS.SET_UI_ROUTE] = setUiPage;
resolver[ACTIONS.CREATE_PROJECT] = async (m, p) => await createProject(m, p);
resolver[ACTIONS.FILTER_RESULTS_BY_TAG] = async (m, p) =>
  await filterResultsByTag(m, p);

/**
 * Component interfacing between the UI and backend-processes, aka resolvers.
 * When an action is fired by the FE, the processor assigns to its resolver.
 *
 * @param {Object} modules store modules to pass to the resolvers
 */
export const processor = (modules) =>
  /**
   * @param {ActionType} action
   */
  async (action) => {
    const { type, payload } = action;
    console.log(`P: ${type} : ${JSON.stringify(payload)}`);

    await resolver[type](modules, payload);
  };

export const withStore = processor({ uiStore, appStore });
