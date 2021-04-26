import controllers from "../controller";

import {
  CHANNEL,
  BE_MESSAGES,
  FE_MESSAGES,
  MessageType,
} from "../../shared/message-passing";
import logger from "../../shared/logger";

const Handler = () => {
  logger.log("[BE]: message handler: ", CHANNEL);
  const bc = new BroadcastChannel(CHANNEL);

  bc.onmessage = ({ data: message }: { data: BE_MESSAGES }) => {
    logger.log(`[BE] receive: ${message.type}`);
    // @ts-ignore
    logger.log(message.payload);

    try {
      switch (message.type) {
        case MessageType.BE_INITIALIZE_PROJECT:
          controllers.initializeProject(message.payload);
          break;
        case MessageType.BE_FILTER_IMAGES:
          controllers.filterImages(message.payload);
          break;
        case MessageType.BE_RESET:
          controllers.reset();
          break;
        case MessageType.BE_DESTROY:
          controllers.destroy();
          break;
      }
    } catch (err) {
      logger.error(
        `[BE] message-handler: onmessage error. ${JSON.stringify(message)}`
      );
    }
  };

  const postMessage = ({ type, payload }: FE_MESSAGES) => {
    logger.log(`[BE] send: ${type}`);
    logger.log(payload);

    bc.postMessage({ type, payload });
  };

  return {
    postMessage,
  };
};

export default Handler();
