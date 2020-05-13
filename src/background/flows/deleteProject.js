import { resetState } from "../store";
import { sendToRenderer } from "../services/utils";

/**
 * Delete allt the information relevant to the project from the backend
 */
const deleteProject = () => {
  // flush store
  resetState();

  // TODONOW: notify the app state when cleaned up, update redux store
  // update rederer state
  // sendToRenderer({
  // type: setImages.type,
  // payload: Object.keys(store.imageHashMap).map((key) => ({
  //   hash: key,
  //   tags: null,
  //   path: normalizeImageUrl(store.imageHashMap[key].path),
  // })),
  // });
};

export default deleteProject;
