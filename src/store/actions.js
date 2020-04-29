import "../types";

// UI actions, that modify both store modules
export const ACTIONS = {
  SET_UI_PAGE: "SET_UI_PAGE",
  CREATE_PROJECT: "CREATE_PROJECT",
  FILTER_RESULTS_BY_TAG: "FILTER_RESULTS_BY_TAG",
};

/**
 * Trigger action in processor
 * @param {ActionType} action
 */
export const triggerAction = async (action) => {
  const { withStore: processor } = require("./processor");
  await processor(action);
};
