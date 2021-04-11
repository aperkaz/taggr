const normalizeUrl = (imagePath) => {
  const normalize = require("normalize-path");

  // fixes linux / windows compatibility
  const normalizedImagePath = normalize(imagePath);
  return normalizedImagePath.startsWith("http")
    ? normalizedImagePath
    : `file://${normalizedImagePath}`;
};

import Image from "../shared/Image";

console.log(Image.print());
console.log(Image.print());

// IPC
const bc = new BroadcastChannel("test_channel");

bc.postMessage("This is BE.");
bc.onmessage = function (ev) {
  console.log("BE: ", ev);
  bc.postMessage("This is BE.");
};

console.log(normalizeUrl("/Users/alain/Downloads/test.jpg"));

const mobilenet = require("@tensorflow-models/mobilenet");

// Load the model.
console.time("loadModel");
mobilenet.load().then(async (model) => {
  console.timeEnd("loadModel");

  const img = document.getElementById("img");

  // Classify the image.
  for (let i = 0; i < 3; i++) {
    console.time("predict");
    const predictions = await model.classify(img);
    console.timeEnd("predict");
  }
});
