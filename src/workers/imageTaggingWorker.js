const { loadModel, classifyImage } = require("../imageRecognition");

/**
 * send classfication tags for an image path
 * @param {Object} path image path
 * @returns {Object} { path: imagePath, tags: []}
 */
onmessage = async (e) => {
  // console.log("worker received message: ", e);
  let tags = [];
  if (!e.data || !e.data.path) return tags;
  const path = e.data.path;

  tags = await classifyImage(path);

  postMessage({ path, tags });
};

// load the required tensorflow.js models
(async () => {
  try {
    await loadModel();
  } catch (err) {
    console.log(err);
  }
})();
