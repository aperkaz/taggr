const { classifyImage } = require("./tfImageClassification");

let queue = [];
let busy = false;

/**
 * send classfication tags for an image path
 * @param {Object} path image path
 * @returns {Object} { path: imagePath, tags: []}
 */
onmessage = async (e) => {
  if (busy) {
    queue.push(e);
  } else {
    busy = true;
    await processMessage(e);
  }
};

async function processMessage(e) {
  let tags = [];
  if (!e.data || !e.data.path) return tags;
  let path = e.data.path;
  let data = e.data.data;

  tags = await classifyImage(data);
  // tags = ["dogs"];

  postMessage({ path, tags });

  // TODO: performance gain?
  e = null;
  path = null;
  data = null;

  if (queue.length) {
    await processMessage(queue.shift());
  } else {
    busy = false;
  }
}
