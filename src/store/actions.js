const { withStore: processor } = require("./processor");

// UI actions, that modify both store modules
const ACTIONS = {
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",

  SET_ROOT_FOLDER_PATH: "SET_ROOT_FOLDER_PATH",

  CALCULATE_IMAGE_PATHS_IN_ROOT: "CALCULATE_IMAGE_PATHS_IN_ROOT",
  SET_IMAGE_PATHS_IN_MAP: "SET_IMAGE_PATHS_IN_MAP",

  CALCULATE_IMAGE_TAGS: "CALCULATE_IMAGE_TAGS",
  SET_IMAGE_TAGS_IN_MAP: "SET_IMAGE_TAGS_IN_MAP",
  SET_IMAGE_TAGS_IN_COUNTER: "SET_IMAGE_TAGS_IN_COUNTER", // to be displaied in header

  SET_IMAGE_FILTER_TAG_SEARCH_VALUE: "SET_IMAGE_FILTER",
};

/**
 * Trigger action in processor
 *
 * @param {ActionType} action
 */
const triggerAction = async (action) => {
  await processor(action);
};

module.exports = {
  triggerAction,
  ACTIONS,
};
