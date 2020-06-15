// @ts-ignore-next-line
require("./types");

// TODO: extract to env variable
const isDevInWindow = false;

/**
 * @type {AppStoreType} initialState
 */
const initialState = {
  projectRootFolderPath: "",
  imageHashMap: {},
};

/**
 * Store for the Backend.
 * Do not read it directly.
 *
 * @type {AppStoreType} appStore
 */
let store = { ...initialState };

if (isDevInWindow) window["store"] = store;

const resetStore = () => {
  store = { ...initialState };

  if (isDevInWindow) window["store"] = store;
};

/**
 *
 * @param {{rootFolder: string, imageHashMap: ImageHashMapType}} arg
 */
const setProject = ({ rootFolder, imageHashMap }) => {
  store.projectRootFolderPath = rootFolder;
  store.imageHashMap = imageHashMap;
};

const getImageHashMap = () => store.imageHashMap;

// TODO: improve the store access layer
const getImagesWithLocation = () => {
  let imagesWithLocation = [];
  Object.keys(store.imageHashMap).forEach((key) => {
    const image = store.imageHashMap[key];
    if (image.location && image.location.latitude) {
      imagesWithLocation.push(image);
    }
  });

  return imagesWithLocation;
};

module.exports = {
  resetStore,
  setProject,
  getImageHashMap,
  getImagesWithLocation,
};
