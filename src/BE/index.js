const normalizeUrl = (imagePath) => {
  const normalize = require("normalize-path");

  // fixes linux / windows compatibility
  const normalizedImagePath = normalize(imagePath);
  return normalizedImagePath.startsWith("http")
    ? normalizedImagePath
    : `file://${normalizedImagePath}`;
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
