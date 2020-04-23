const Comlink = require("comlink");
const classifyImage = require("./tfImageClassification");

Comlink.expose({
  async process(imageData) {
    console.log("image tagging worker triggered");
    let tags = [];

    tags = await classifyImage(imageData);

    return tags;
  },
});
