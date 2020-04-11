const { loadModel, classifyImage } = require("./tfImageClassification");

/**
 * send classfication tags for an image path
 * @param {Object} path image path
 * @returns {Object} { path: imagePath, tags: []}
 */
onmessage = async (e) => {
  let tags = [];
  if (!e.data || !e.data.path) return tags;
  const path = e.data.path;

  // tags = await classifyImage(path);
  tags = ["cat", "dog"];

  postMessage({ path, tags });
};

// load the required tensorflow.js models required by the worker
(async () => {
  try {
    await loadModel();
  } catch (err) {
    console.log(err);
  }
})();
