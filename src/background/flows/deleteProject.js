import { RENDERER_ACTIONS } from "../../shared/actions";

import { resetStore, stopFlows } from "../store";
import { sendToRenderer } from "../services/utils";

/**
 * Stop the current flows and delete the information relevant to the project from the backend
 */
const deleteProject = async () => {
  // background
  stopFlows();
  resetStore();

  // renderer
  sendToRenderer({
    type: RENDERER_ACTIONS.resetState.type,
    payload: null,
  });
};

export default deleteProject;

// TODO: refactor: move shared actions to /shared.
