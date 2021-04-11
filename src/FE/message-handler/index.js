import MESSAGES_PASSING from "../../shared/message-passings";

const Handler = () => {
  console.log("[FE]: message handler: ", MESSAGES_PASSING.DEFAULT_CHANNEL);
  const bc = new BroadcastChannel(MESSAGES_PASSING.DEFAULT_CHANNEL);

  bc.onmessage = function (ev) {
    console.log("[FE]: received", ev);
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
