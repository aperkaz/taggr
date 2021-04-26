import { getClassificationIds } from "./ml/types/classification";

// Initialize sentry
import "../shared/sentry";
// Initialize communication handler
import "./message-handler";

// TEST STUFF

const normalizeUrl = (imagePath) => {
  const normalize = require("normalize-path");

  // fixes linux / windows compatibility
  const normalizedImagePath = normalize(imagePath);
  return normalizedImagePath.startsWith("http")
    ? normalizedImagePath
    : `file://${normalizedImagePath}`;
};

console.log(normalizeUrl("/Users/alain/Downloads/test.jpg"));

const img = document.getElementById("img");
img.src = "file:///Users/alain/Downloads/test.jpg";
img.onload = async () => {
  console.log(await getClassificationIds(img));
};

// Classify the image.
// for (let i = 0; i < 3; i++) {
//   console.time("predict");

//   // await loadImage("file:///Users/alain/Downloads/test.png")
//   const predictions = await model.classify(img);
//   console.timeEnd("predict");
// }
// });
