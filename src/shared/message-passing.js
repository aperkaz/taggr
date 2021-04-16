/**
 * @typedef {Object} Message
 * @property {string} type
 * @property {Object} payload
 */

export const CHANNEL = "taggr-message-passing";

export const MESSAGE_TYPES = {
  // BE
  BE_INITIALIZE_PROJECT: "BE_INITIALIZE_PROJECT",
  // FE
  FE_SET_ROUTE: "FE_SET_ROUTE",
  FE_UPDATE_IMAGES: "FE_UPDATE_IMAGES",
};

export const MESSAGE_CREATORS = {
  /**
   * @param {string} path
   */
  BE_initializeProject: (path) => ({
    type: MESSAGE_TYPES.BE_INITIALIZE_PROJECT,
    payload: path,
  }),
  /**
   * @param {string} path
   */
  FE_setRoute: (route) => ({
    type: MESSAGE_TYPES.FE_SET_ROUTE,
    payload: route,
  }),
  /**
   * @param {import("./entities").ImageType[]} imageList
   * @returns
   */
  FE_updateImages: (imageList) => ({
    type: MESSAGE_TYPES.FE_UPDATE_IMAGES,
    payload: imageList,
  }),
};
