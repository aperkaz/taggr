import logger from "../../shared/logger";
import {
  CHANNEL,
  BE_MESSAGES,
  FE_MESSAGES,
  MessageType,
} from "../../shared/message-passing";

import store, { ACTIONS } from "../store";

const Handler = () => {
  logger.log("[FE]: message handler: ", CHANNEL);
  const bc = new BroadcastChannel(CHANNEL);

  bc.onmessage = function ({ data: message }: { data: FE_MESSAGES }) {
    logger.log(`[FE] receive, type: ${message.type}`);
    logger.log(`[FE] receive, payload: ${JSON.stringify(message.payload)}`);

    switch (message.type) {
      case MessageType.FE_SET_ROUTE:
        store.dispatch(ACTIONS.setActiveRoute(message.payload));
        break;
      case MessageType.FE_SET_IMAGES:
        store.dispatch(ACTIONS.setImages(message.payload));
        break;
      case MessageType.FE_SET_PROGRESS:
        store.dispatch(ACTIONS.setProgress(message.payload));
        break;
      case MessageType.FE_SET_IS_PROCESSING:
        store.dispatch(ACTIONS.setIsProcessing(message.payload));
        break;
      case MessageType.FE_SET_IS_SUPPORTER:
        store.dispatch(ACTIONS.setIsSupporter(message.payload));
        break;
    }
  };

  const postMessage = (message: BE_MESSAGES) => {
    logger.log(`[FE] send, type: ${message.type}`);
    // @ts-ignore
    logger.log(`[FE] send, payload: ${JSON.stringify(message.payload)}`);

    bc.postMessage(message);
  };

  return {
    postMessage,
  };
};

export default Handler();
