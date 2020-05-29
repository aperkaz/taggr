import { RENDERER_ACTIONS } from "../../shared/actions";

import { getImageHashMap } from "../store";
import { sendToRenderer } from "../services/utils";
import { searchImagesByTags } from "../operations/tags/searchImagesByTags";

const searchImages = async (payload) => {
  console.time("searchImages");
  const matchingImages = searchImagesByTags(getImageHashMap(), payload);
  console.timeEnd("searchImages");

  sendToRenderer({
    type: RENDERER_ACTIONS.setImages.type,
    payload: matchingImages,
  });
};

export default searchImages;
