import { BorderAll } from "@material-ui/icons";
import MESSAGES_PASSING from "../../shared/message-passing";
import store, { ACTIONS } from "../store";

const Handler = () => {
  console.log("[FE]: message handler: ", MESSAGES_PASSING.DEFAULT_CHANNEL);
  const bc = new BroadcastChannel(MESSAGES_PASSING.DEFAULT_CHANNEL);

  /**
   * @param {{data: {type: string, payload: any}}} message
   */
  bc.onmessage = function ({ data }) {
    console.log("[FE] receive: ", data);

    switch (data.type) {
      // TODONOW: rename events to FE/BE events, to differenciate
      case MESSAGES_PASSING.MESSAGE_TYPES.SET_ROUTE:
        store.dispatch(ACTIONS.setActiveRoute(data.payload));
        break;
      case MESSAGES_PASSING.MESSAGE_TYPES.UPDATE_IMAGES:
        console.log(data);
        store.dispatch(ACTIONS.setImages(data.payload));
        break;
    }
  };

  /**
   * @param {{type: string, payload: any}} message
   */
  const postMessage = ({ type, payload = {} }) => {
    console.log(`[FE] send: `, type);
    bc.postMessage({ type, payload });
  };

  return {
    postMessage,
  };
};

export default Handler();
