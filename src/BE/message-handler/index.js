import MESSAGES_PASSING from "../../shared/message-passings";

const Handler = () => {
  console.log("[BE]: message handler: ", MESSAGES_PASSING.DEFAULT_CHANNEL);
  const bc = new BroadcastChannel(MESSAGES_PASSING.DEFAULT_CHANNEL);

  /**
   *
   * @param {{data: {type: string, payload: any}}} message
   */
  bc.onmessage = function ({ data }) {
    console.log(data);

    switch (data.type) {
      case MESSAGES_PASSING.MESSAGE_TYPES.INITIALIZE_PROJECT:
        console.log("initialize project!");
    }
  };

  /**
   * @param {{type: string, payload: any}} message
   */
  const postMessage = ({ type, payload }) => {
    console.log(`[BE] send: `, type);
    bc.postMessage({ type, payload });
  };

  return {
    postMessage,
  };
};

export default Handler();
