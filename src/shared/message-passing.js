const DEFAULT_CHANNEL = "taggr-message-passing";

const MESSAGE_TYPES = {
  INITIALIZE_PROJECT: "INITIALIZE_PROJECT",
  SET_ROUTE: "SET_ROUTE",
};

const MESSAGES = {
  /**
   * @param { string} path
   */
  initializeProject: (path) => ({
    type: MESSAGE_TYPES.INITIALIZE_PROJECT,
    payload: path,
  }),
  /**
   * @param { string} path
   */
  setRoute: (route) => ({
    type: MESSAGE_TYPES.SET_ROUTE,
    payload: route,
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
