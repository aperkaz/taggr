const { classifyImage } = require("./tfImageClassification");

let queue = [];
let busy = false;

/**
 * Calculate classfication tags for an image path
 * @param {Object} data image path
 */
onmessage = async (data) => {
  if (busy) {
    queue.push(data);
  } else {
    busy = true;
    await processMessage(data);
  }
};

async function processMessage({ data: { path, data } }) {
  let tags = [];

  tags = await classifyImage(data);

  postMessage({ path, tags });

  // cleanup for GC
  tags = [];
  path = null;
  data = null;

  if (queue.length) {
    await processMessage(queue.shift());
  } else {
    busy = false;
  }
}
