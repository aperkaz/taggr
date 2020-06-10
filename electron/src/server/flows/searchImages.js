// const { RENDERER_ACTIONS } from "../../shared/actions";

const { getImageHashMap } = require("../store");
// import { sendToRenderer } from "../services/utils";
const searchImagesByTags = require("../operations/tags/searchImagesByTags");

const searchImages = async (payload) => {
  console.time("searchImages");
  const matchingImages = searchImagesByTags(getImageHashMap(), payload);
  console.timeEnd("searchImages");

  // TODONOW: add in services
  // sendToRenderer({
  //   type: RENDERER_ACTIONS.setImages.type,
  //   payload: matchingImages,
  // });
};

module.exports = searchImages;
