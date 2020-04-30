import appStore from "./modules/appStore";
import uiStore from "./modules/uiStore";
import { ACTIONS, triggerAction } from "./actions";

const initializeStores = () => {
  // add to global window object for further debug
  window["appStore"] = appStore;
  window["uiStore"] = uiStore;
};

export default initializeStores;
export { ACTIONS, triggerAction };
