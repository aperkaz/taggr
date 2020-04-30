import { ACTIONS } from "../uiStore";

export const TASKS = {
  SET_UI_PAGE: "SET_UI_PAGE",
  SEARCH_IMAGE_PATHS: "SEARCH_IMAGE_PATHS",
  CALCULATE_IMAGE_TAGS: "CALCULATE_IMAGE_TAGS",
};

/**
 * Create task for queue consuption
 * @param {string} name
 * @param {object} payload
 */
const createTask = (name, payload) => {
  if (!name) console.error("no task defined with that name");
  return {
    name,
    payload,
  };
};

// Map uiActions to queue-tasks array
let actionToTaskMap = {};

actionToTaskMap[ACTIONS.SET_UI_PAGE] = (p) => [
  createTask(TASKS.SET_UI_PAGE, p),
];

actionToTaskMap[ACTIONS.CREATE_PROJECT] = (p) => [
  createTask(TASKS.SEARCH_IMAGE_PATHS, p),
  createTask(TASKS.CALCULATE_IMAGE_TAGS, p),
];

actionToTaskMap[ACTIONS.FILTER_RESULTS_BY_TAG] = null;

export { actionToTaskMap };
