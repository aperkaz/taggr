import { searchImagesByTags } from "../searchImagesByTags";
import "../../../types";

/**
 * @type {ImageHashMapType}
 */
const imageHashMap = {
  image1: {
    hash: "image1",
    path: "./path",
    rawPath: "./path",
    tags: ["animal", "vehicle"],
    location: {},
  },
  image2: {
    hash: "image2",
    path: "./path",
    rawPath: "./path",
    tags: ["vehicle"],
    location: {},
  },
  image3: {
    hash: "image2",
    path: "./path",
    rawPath: "./path",
    tags: [],
    location: {},
  },
};

test("searchImages with single tag", () => {
  const resultImages = searchImagesByTags(imageHashMap, ["vehicle"]);

  expect(resultImages.length).toBe(2);
  expect(resultImages[0].hash).toBe("image1");
});

test("searchImages with multiple tags", () => {
  const resultImages = searchImagesByTags(imageHashMap, ["animal", "vehicle"]);

  expect(resultImages.length).toBe(1);
  expect(resultImages[0].hash).toBe("image1");
});

test("searchImages with empty tags", () => {
  const allImagesInCollection = Object.keys(imageHashMap).length;

  const resultImages = searchImagesByTags(imageHashMap, []);

  expect(resultImages.length).toBe(allImagesInCollection);
});
