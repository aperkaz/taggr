import store, { ACTIONS } from "../store";
import CONSTANTS from "../store/constants";
import { registerHandler } from "./helpers";
import { FE_EVENTS } from "../IPC_EVENTS";
/**
 * Message handlers, for messages comming from the backend
 */

/**
 * Update the images in the Frontend.
 * @param {{images: Object[], imagesWithLocation: Object[]}} images
 */
registerHandler(FE_EVENTS.UPDATE_IMAGES, ({ images, imagesWithLocation }) => {
  store.dispatch(ACTIONS.setImages(images));
  store.dispatch(ACTIONS.setImagesWithLocation(imagesWithLocation));
});

/**
 * Update the images with location in the Frontend.
 * @param {Object[]} imagesWithLocation
 */
registerHandler(FE_EVENTS.UPDATE_IMAGES_WITH_LOCATION, (imagesWithLocation) => {
  store.dispatch(ACTIONS.setImagesWithLocation(imagesWithLocation));
});

/**
 * Update the value of task in the Frontend, if there is any.
 * @param {Object} task
 */
registerHandler(FE_EVENTS.UPDATE_TASK, (task) => {
  console.log("task updated");
  store.dispatch(ACTIONS.setTask(task));
});

registerHandler(FE_EVENTS.SET_ROUTE, (routeName) => {
  const route = CONSTANTS.ROUTES[routeName];
  if (!route) {
    console.error(`Route [${routeName}] does not exist`);
  }
  store.dispatch(ACTIONS.setActiveRoute(route));
});

/**
 * Reset UI state
 */
registerHandler(FE_EVENTS.RESET_STATE, () => {
  store.dispatch(ACTIONS.resetState());
});
