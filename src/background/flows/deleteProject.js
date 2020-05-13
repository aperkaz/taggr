import { resetStore } from "../store";
import { sendToRenderer } from "../services/utils";

import { resetState } from "../../renderer/store";

/**
 * Delete allt the information relevant to the project from the backend
 */
const deleteProject = () => {
  resetStore();

  sendToRenderer({
    type: resetState.type,
    payload: null,
  });
};

export default deleteProject;

// TODO: review the flow of actions. right now mished between service layer and ipc
