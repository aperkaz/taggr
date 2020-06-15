const baseImageProps = {
  hash: "imageHash",
  path: "./path",
  rawPath: "./path",
  location: { latitude: null, longitude: null },
};

const getImageHashMap = () => ({
  image1: {
    ...baseImageProps,
    tags: ["animal", "vehicle"],
    creationDate: 100,
  },
  image2: {
    ...baseImageProps,
    tags: ["vehicle"],
    creationDate: 200,
  },
  image3: {
    ...baseImageProps,
    tags: [],
    creationDate: 300,
  },
});

const getImagesWithLocation = () => ({
  image1: {
    ...baseImageProps,
    tags: ["animal", "vehicle"],
    creationDate: 100,
    location: { latitude: 100, longitude: 100 },
  },
  image2: {
    ...baseImageProps,
    tags: ["vehicle"],
    creationDate: 200,
    location: { latitude: 100, longitude: 100 },
  },
  image3: {
    ...baseImageProps,
    tags: [],
    creationDate: 300,
    location: { latitude: 100, longitude: 100 },
  },
});

module.exports = {
  getImageHashMap,
  getImagesWithLocation,
};
