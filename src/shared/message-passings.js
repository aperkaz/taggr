export default {
  DEFAULT_CHANNEL: "taggr-message-passing",
  EVENTS: {
    INITIALIZE_PROJECT: "INITIALIZE_PROJECT",
  },
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
