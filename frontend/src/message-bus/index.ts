import { messageBus, sharedUtils } from "taggr-shared";
import store, { ACTIONS } from "../store";

const SETUP_CHANNEL = messageBus.CHANNELS.SETUP;
const MAIN_CHANNEL = messageBus.CHANNELS.MAIN;

let beWebContentId: number | undefined;

// setup channel callback
window.ipcRenderer.on(
  SETUP_CHANNEL,
  (event, message: messageBus.SETUP_MESSAGE) => {
    beWebContentId = message.beWebContentId;
    console.log(`[FE] message bus online: beWebContentId: ${beWebContentId}`);
  }
);

// main channel callback
window.ipcRenderer.on(
  MAIN_CHANNEL,
  (event, message?: messageBus.FE_MESSAGES) => {
    if (!message || !message.type.startsWith("frontend")) {
      return console.error(
        `[FE] can not process message: ${JSON.stringify(message)}`
      );
    }

    console.log(
      `[FE] receive, type: ${message.type} \npayload: ${JSON.stringify(
        message.payload
      )}`
    );

    switch (message.type) {
      case "frontend_set-route":
        store.dispatch(ACTIONS.setActiveRoute(message.payload));
        break;
      case "frontend_set-images":
        store.dispatch(ACTIONS.setImages(message.payload));
        break;
      case "frontend_set-progress":
        store.dispatch(ACTIONS.setProgress(message.payload));
        break;
      case "frontend_set-is-processing":
        store.dispatch(ACTIONS.setIsProcessing(message.payload));
        break;
      default:
        throw new sharedUtils.UnreachableCaseError(message);
    }
  }
);

export const sendToBackend = (message: messageBus.BE_MESSAGES): void => {
  if (!beWebContentId || isNaN(beWebContentId))
    throw new Error(
      "[FE] ipc can not send message, is missing the beWebContentId"
    );

  // TODONOW: fix type rendering
  console.log(
    `[FE] sending, type: ${message.type} \npayload: ${JSON.stringify(
      message.payload
    )}`
  );
  window.ipcRenderer.sendTo(beWebContentId, MAIN_CHANNEL, message);
};
