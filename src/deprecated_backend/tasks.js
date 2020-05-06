// import { ACTIONS } from "../uiStore";

// export const TASKS = {
//   SET_UI_ROUTE: "SET_UI_ROUTE",

//   SET_PROJECT_ROOT_FOLDER_PATH: "SET_PROJECT_ROOT_FOLDER_PATH",
//   CLEAN_PROJECT_DATA: "CLEAN_PROJECT_DATA",
//   SEARCH_IMAGE_PATHS: "SEARCH_IMAGE_PATHS",
//   CALCULATE_IMAGE_TAGS: "CALCULATE_IMAGE_TAGS",
//   CALCULATE_TOP_TAGS: "CALCULATE_TOP_TAGS",

//   SEARCH_IMAGES_BY_TAG: "SEARCH_IMAGES_BY_TAG",
// };

// /**
//  * Create task for queue consuption
//  * @param {string} name
//  * @param {object} payload
//  */
// const createTask = (name, payload) => {
//   if (!name) console.error("no task defined with that name");
//   return {
//     name,
//     payload,
//   };
// };

// // Map uiActions to queue-tasks array
// let actionToTaskMap = {};

// actionToTaskMap[ACTIONS.SET_UI_ROUTE] = (newRoute) => [
//   createTask(TASKS.SET_UI_ROUTE, newRoute),
// ];

// actionToTaskMap[ACTIONS.CREATE_PROJECT] = (p) => [
//   createTask(TASKS.CLEAN_PROJECT_DATA, p),
//   createTask(TASKS.SET_PROJECT_ROOT_FOLDER_PATH, p),
//   createTask(TASKS.SEARCH_IMAGE_PATHS, p),
//   createTask(TASKS.SEARCH_IMAGES_BY_TAG, ""),
//   createTask(TASKS.CALCULATE_IMAGE_TAGS, p),
//   // createTask(TASKS.CALCULATE_TOP_TAGS, p),
// ];

// actionToTaskMap[ACTIONS.FILTER_RESULTS_BY_TAG] = (searchValue) => [
//   createTask(TASKS.SEARCH_IMAGES_BY_TAG, searchValue),
// ];

// export { actionToTaskMap };
