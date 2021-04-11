// Initialize communication handler
import messageHandler from "./message-handler";
messageHandler.postMessage({ type: "test", payload: "Hola BE" });

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

const mobilenet = require("@tensorflow-models/mobilenet");

function handleImage(path) {
  var reader = new FileReader();

  console.log(Date.now());

  reader.onload = function (event) {
    console.log(i);
    var img = new Image();

    img.onload = onLoad(i, img);
    img.src = event.target.result;
  };
  console.time("readImg");
  reader.readAsDataURL(path);
  console.timeEnd("readImg");
}

const onLoad = (i, img) => () => {
  console.log(`image-${i}`);
  var canvas = document.getElementById(`image-${i}`);
  console.log(canvas);
  var ctx = canvas.getContext("2d");

  const width = 500;
  const height = (500 * img.height) / img.width;

  canvas.width = width;
  canvas.height = height;

  // ctx.drawImage(img, 0, 0);
  ctx.drawImage(img, 0, 0, width, height);

  console.log(Date.now());
};

// Load the model.
console.time("loadModel");
mobilenet.load().then(async (model) => {
  console.timeEnd("loadModel");

  const img = document.getElementById("img");
  img.src = "file:///Users/alain/Downloads/test.jpg";
  img.onload = async () => console.log(await model.classify(img));

  // Classify the image.
  // for (let i = 0; i < 3; i++) {
  //   console.time("predict");

  //   // await loadImage("file:///Users/alain/Downloads/test.png")
  //   const predictions = await model.classify(img);
  //   console.timeEnd("predict");
  // }
});
