// UI actions, that modify both store modules
const ACTIONS = {
  SET_UI_PAGE: "SET_UI_PAGE",
  CREATE_PROJECT: "CREATE_PROJECT",
  FILTER_RESULTS_BY_TAG: "FILTER_RESULTS_BY_TAG",
};

/**
 * Trigger action in processor
 * // TODONOW: fix types
 * @param {ActionType} action
 */
const triggerAction = async (action) => {
  const { withStore: processor } = require("./processor");
  await processor(action);
};

module.exports = {
  triggerAction,
  ACTIONS,
};
