import { messageBus, typeUtils } from "taggr-shared";

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
      case "frontend-notify":
        console.log("FE frontend-notify: ", message.payload);
        break;
      default:
        throw new typeUtils.UnreachableCaseError(message.type);
    }
  }
);

export const sendToBackend = (message: messageBus.BE_MESSAGES): void => {
  if (!beWebContentId || isNaN(beWebContentId))
    throw new Error(
      "[FE] ipc ca not send message, is missing the beWebContentId"
    );

  console.log(
    `[FE] sending, type: ${message.type} \npayload: ${JSON.stringify(
      message.payload
    )}`
  );
  window.ipcRenderer.sendTo(beWebContentId, MAIN_CHANNEL, message);
};
