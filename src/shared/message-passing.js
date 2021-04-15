const DEFAULT_CHANNEL = "taggr-message-passing";

const MESSAGE_TYPES = {
  INITIALIZE_PROJECT: "INITIALIZE_PROJECT",
  SET_ROUTE: "SET_ROUTE",
  UPDATE_IMAGES: "UPDATE_IMAGES",
};

// FIX: add prefixes
const MESSAGES = {
  /**
   * @param {string} path
   */
  initializeProject: (path) => ({
    type: MESSAGE_TYPES.INITIALIZE_PROJECT,
    payload: path,
  }),
  /**
   * @param {string} path
   */
  setRoute: (route) => ({
    type: MESSAGE_TYPES.SET_ROUTE,
    payload: route,
  }),
  /**
   * @param {import("./entities").ImageType[]} imageList
   * @returns
   */
  updateImages: (imageList) => ({
    type: MESSAGE_TYPES.UPDATE_IMAGES,
    payload: imageList,
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
