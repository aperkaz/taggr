import { CHANNEL, MESSAGE_TYPES } from "../../shared/message-passing";
import logger from "../../shared/logger";

import controllers from "../controller";

const Handler = () => {
  logger.log("[BE]: message handler: ", CHANNEL);
  const bc = new BroadcastChannel(CHANNEL);

  /**
   * @param {{data: import("../../shared/message-passing").Message}} message
   */
  bc.onmessage = ({ data: message }) => {
    logger.log(`[BE] receive: ${message.type}`);
    logger.log(message.payload);

    try {
      switch (message.type) {
        case MESSAGE_TYPES.BE_INITIALIZE_PROJECT:
          controllers.initializeProject(message.payload);
          break;
        case MESSAGE_TYPES.BE_FILTER_IMAGES:
          controllers.filterImages(message.payload);
          break;
        case MESSAGE_TYPES.BE_RESET:
          controllers.reset();
          break;
      }
    } catch (err) {
      // TODONOW: report sentry
    }
  };

  /**
   * @param {import("../../shared/message-passing").Message} message
   */
  const postMessage = ({ type, payload = {} }) => {
    logger.log(`[BE] send: ${type}`);
    logger.log(payload);

    bc.postMessage({ type, payload });
  };

  return {
    postMessage,
  };
};

export default Handler();
