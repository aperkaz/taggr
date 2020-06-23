import store, { ACTIONS } from "../store";
import { registerHandler } from "./helpers";

/**
 * Message handlers, for messages comming from the backend
 */

/**
 * Update the images in the Frontend.
 * @param {{images: Object[], imagesWithLocation: Object[]}} images
 */
registerHandler("update-images", ({ images, imagesWithLocation }) => {
  store.dispatch(ACTIONS.setImages(images));
  store.dispatch(ACTIONS.setImagesWithLocation(imagesWithLocation));
});

/**
 * Update the images with location in the Frontend.
 * @param {Object[]} imagesWithLocation
 */
registerHandler("update-images-with-location", (imagesWithLocation) => {
  store.dispatch(ACTIONS.setImagesWithLocation(imagesWithLocation));
});

/**
 * Update the value of task in the Frontend, if there is any.
 * @param {Object} task
 */
registerHandler("update-task", (task) => {
  console.log("task updated");
  store.dispatch(ACTIONS.setTask(task));
});

/**
 * Reset UI state
 */
registerHandler("reset-state", () => {
  store.dispatch(ACTIONS.resetState());
});
