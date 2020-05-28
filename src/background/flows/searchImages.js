import { getImageHashMap } from "../store";
import { sendToRenderer } from "../services/utils";
import { searchImagesByTags } from "../operations/tags/searchImagesByTags";

import { setImages } from "../../renderer/store";

const searchImages = async (payload) => {
  console.time("searchImages");
  const matchingImages = searchImagesByTags(getImageHashMap(), payload);
  console.timeEnd("searchImages");

  sendToRenderer({ type: setImages.type, payload: matchingImages });
};

export default searchImages;
