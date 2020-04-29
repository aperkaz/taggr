import AppStore, { actions as AppStoreActions } from "./AppStore";
import UIStore, { actions as UIStoreActions } from "./UIStore";

AppStore.initializeWorkers();

const actions = { ...AppStoreActions, ...UIStoreActions };

export { AppStore, UIStore, actions };
