import logger from "../../shared/logger";
import { CHANNEL, MESSAGE_TYPES } from "../../shared/message-passing";

import store, { ACTIONS } from "../store";

const Handler = () => {
  logger.log("[FE]: message handler: ", CHANNEL);
  const bc = new BroadcastChannel(CHANNEL);

  /**
   * @param {{data: import("../../shared/message-passing").Message}} message
   */
  bc.onmessage = function ({ data: message }) {
    logger.log(`[FE] receive: ${message.type}`);
    logger.log(message.payload);

    switch (message.type) {
      case MESSAGE_TYPES.FE_SET_ROUTE:
        store.dispatch(ACTIONS.setActiveRoute(message.payload));
        break;
      case MESSAGE_TYPES.FE_SET_IMAGES:
        store.dispatch(ACTIONS.setImages(message.payload));
        break;
      case MESSAGE_TYPES.FE_SET_PROGRESS:
        store.dispatch(ACTIONS.setProgress(message.payload));
        break;
    }
  };

  /**
   * @param {import("../../shared/message-passing").Message} message
   */
  const postMessage = ({ type, payload = {} }) => {
    logger.log(`[FE] send: ${type}`);
    logger.log(payload);

    bc.postMessage({ type, payload });
  };

  return {
    postMessage,
  };
};

export default Handler();
