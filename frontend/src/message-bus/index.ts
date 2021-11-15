import { messageBus, utils } from "taggr-shared";
import store, { ACTIONS } from "../store";

let beWebContentId: number | undefined = 1;
// TODONOW: add tests to this

// setup channel callback
window.ipcRenderer.on("taggr-ipc-setup", (_event, message) => {
  beWebContentId = message.beWebContentId;
  console.log(`[FE] message bus online: beWebContentId: ${beWebContentId}`);
});

// main channel callback
window.ipcRenderer.on("taggr-ipc-main", (_event, message) => {
  if (!message || !message.type.startsWith(messageBus.FE_MESSAGE_NAMESPACE)) {
    return console.error(
      `[FE] can not process message: ${JSON.stringify(message)}`
    );
  }

  console.log(`[FE] received: ${JSON.stringify(message)}`);

  switch (message.type) {
    case "frontend_set-route":
      store.dispatch(ACTIONS.setActiveRoute(message.payload));
      break;
    case "frontend_set-images":
      store.dispatch(ACTIONS.setImages(message.payload));
      break;
    case "frontend_set-images-with-location":
      store.dispatch(ACTIONS.setImagesWithLocation(message.payload));
      break;
    case "frontend_set-progress":
      store.dispatch(ACTIONS.setProgress(message.payload));
      break;
    default:
      throw new utils.UnreachableCaseError(message);
  }
});

/**
 * Send ipc message directly to the BE.
 */
export const sendToBackend = (message: messageBus.BE_MESSAGES): void => {
  if (!beWebContentId || isNaN(beWebContentId))
    throw new Error(
      "[FE] ipc can not send message, is missing the beWebContentId"
    );

  console.log(`[FE] sending: ${JSON.stringify(message)}`);
  window.ipcRenderer.sendTo(beWebContentId, "taggr-ipc-main", message);
};
