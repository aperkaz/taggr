const DEFAULT_CHANNEL = "taggr-message-passing";

const MESSAGE_TYPES = {
  INITIALIZE_PROJECT: "INITIALIZE_PROJECT",
};

const MESSAGES = {
  /**
   * @param { string} path
   */
  initializeProject: (path) => ({
    type: MESSAGE_TYPES.INITIALIZE_PROJECT,
    payload: path,
  }),
};

export default {
  DEFAULT_CHANNEL,
  MESSAGE_TYPES,
  MESSAGES,
};

export class Message {
  /**
   *
   * @param {{
   * type: string,
   * payload: any,
   * }} params
   */
  constructor({ type, payload }) {
    this.type = type;
    this.payload = payload;
  }
}
