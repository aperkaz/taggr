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
};

test("searchImages with single tag", () => {
  const searchTags = ["animal"];

  const images = searchImagesByTags(imageHashMap, searchTags);

  expect(images.length).toBe(1);
  expect(images[0].hash).toBe("image1");
});

test("searchImages with multiple tags", () => {
  const searchTags = ["animal", "vehicle"];

  const images = searchImagesByTags(imageHashMap, searchTags);

  expect(images.length).toBe(1);
  expect(images[0].hash).toBe("image1");
});

test("searchImages with empty tags", () => {
  const searchTags = [];

  const images = searchImagesByTags(imageHashMap, searchTags);

  expect(images.length).toBe(1);
  expect(images[0].hash).toBe("image1");
});
