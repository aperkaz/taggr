import { resetStore, setStopFlow } from "../store";
import { sendToRenderer } from "../services/utils";

import { resetState } from "../../renderer/store";

/**
 * Stop the current flows and delete the information relevant to the project from the backend
 */
const deleteProject = async () => {
  // background
  // TODONOW: fix superhack
  setStopFlow(true);
  await new Promise((r) => setTimeout(r, 200));
  resetStore();
  await new Promise((r) => setTimeout(r, 1500)); // leave time for flows to stop.
  resetStore();
  setStopFlow(false);

  // renderer
  sendToRenderer({
    type: resetState.type,
    payload: null,
  });
};

export default deleteProject;

// TODO: refactor: move shared actions to /shared.
