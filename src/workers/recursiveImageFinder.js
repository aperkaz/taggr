const { findImagePathsInFolder } = require("../store/utils");

onmessage = async ({ data: { path } }) => {
  const imagePathsList = await findImagePathsInFolder(path);
  postMessage({ imagePathsList });
};
