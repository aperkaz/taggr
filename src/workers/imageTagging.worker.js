const { initialize, analizeObjects } = require("./tfImageClassification");

/**
 * send classfication tags for an image path
 * @param {Object} path image path
 * @returns {Object} { path: imagePath, tags: []}
 */
onmessage = async (e) => {
  let tags = [];
  if (!e.data || !e.data.path) return tags;
  const path = e.data.path;

  // tags = await analizeObjects(path);
  tags = ["cat", "dog"];

  self.postMessage({ path, tags });
};

// load the required tensorflow.js models required by the worker
(async () => {
  try {
    // await initialize();
  } catch (err) {
    console.log(err);
  }
})();
