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
    logger.log(`[BE] receive, type: ${message.type}`);
    // @ts-ignore
    logger.log(`[BE] receive, payload: ${JSON.stringify(message.payload)}`);

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
        case MessageType.BE_CHECK_IS_SUPPORTER:
          controllers.checkIsSupporter(message.payload);
          break;
      }
    } catch (err) {
      logger.error(
        `[BE] message-handler: onmessage error. ${JSON.stringify(message)}`
      );
    }
  };

  const postMessage = (message: FE_MESSAGES) => {
    logger.log(`[BE] send, type: ${message.type}`);
    logger.log(`[FE] send, payload: ${message.payload}`);

    bc.postMessage(message);
  };

  return {
    postMessage,
  };
};

export default Handler();
