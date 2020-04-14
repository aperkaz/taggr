// TODO: add new visualization algorithms npmjs.com/package/opencv4nodejs
// const { loadModel, classifyImage } = require("./tfImageClassification");
// also: load the model from the filesystem
// https://github.com/bartosz-paternoga/MobileNet_tfjs-node_Serverless/tree/89a587bd25935d632e90af286abdbbcf658e5190
// https://github.com/tensorflow/tfjs/blob/022376982ad26736abe92d587adb809b7f2482fb/tfjs-converter/demo/mobilenet/mobilenet.js
// https://github.com/tensorflow/tfjs-examples/blob/master/mobilenet/index.js
// https://github.com/tensorflow/tfjs/blob/26bccc44133ae14d98f3ac6f217a4ee8d51055f0/tfjs-node/src/image_test.ts

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

  self.postMessage({ path, tags });
};

// load the required tensorflow.js models required by the worker
(async () => {
  try {
    // await loadModel();
  } catch (err) {
    console.log(err);
  }
})();
