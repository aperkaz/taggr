const { classifyImage } = require("./tfImageClassification");

let queue = [];
let busy = false;

/**
 * send classfication tags for an image path
 * @param {Object} payload image path
 * @returns {Promise<Object>} { path: imagePath, tags: []}
 */
onmessage = async ({ data }) => {
  if (busy) {
    queue.push(data);
  } else {
    busy = true;
    await processMessage(data);
  }
};

async function processMessage({ path, imageData }) {
  let tags = [];

  tags = await classifyImage(imageData);
  // tags = ["dogs"];

  postMessage({ path, tags });

  path = null;
  tags = null;

  if (queue.length) {
    await processMessage(queue.shift());
  } else {
    busy = false;
  }
}
