// const { RENDERER_ACTIONS } = require("../../shared/actions");

const { resetStore, stopFlows } = require("../store");
const { sendToRenderer } = require("../services/utils");

/**
 * Stop the current flows and delete the information relevant to the project from the backend
 */
const deleteProject = async () => {
  // background
  stopFlows();
  resetStore();

  // renderer
  // TODONOW: fix connection
  // sendToRenderer({
  //   type: RENDERER_ACTIONS.resetState.type,
  //   payload: null,
  // });
};

module.exports = deleteProject;

// TODO: refactor: move shared actions to /shared.
