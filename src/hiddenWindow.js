const { ipcRenderer } = require("electron");
import classifyImage, { loadModel } from "./workers/tfImageClassification";

console.log("i am the hidden window mFs");

ipcRenderer.on("message", (event, message) => {
  console.log("hidden window processing message");
  console.log(message);

  const { getGlobal } = require("electron").remote;
  let mainWindow = getGlobal("mainWindow");
  if (mainWindow) {
    console.log("main window found, sending message");
    mainWindow.webContents.send("message", "Message from Window 2");
  }
});

(async () => {
  console.log("load model");
  await loadModel();
  for (let i = 0; i < 1000; i++) {
    const imageData = await generateImageData("/home/alain/Desktop/a b/0.jpg");
    console.log(await classifyImage(imageData));
  }
})();

/**
 * Load image using DOM Image element
 *
 * @param {String} path
 * @returns {Promise<HTMLImageElement>} loaded image
 */
async function loadImage(path) {
  console.log("about to load image");
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = (err) => reject(err);
    img.onload = () => resolve(img);
    img.src = `file:///${path}`;
  });
}

/**
 * Generate a ImageData structure from a imagePath. Prepocess using Canvas to algorithm input: 224px
 *
 * @param {String} imagePath
 * @returns {Promise<ImageData>} loaded image
 */
export const generateImageData = async (imagePath) => {
  let img = await loadImage(imagePath);

  const MAX_HEIGHT = 224;

  // calculate new ratios for image size, based on MAX_HEIGHT
  if (img.height > MAX_HEIGHT) {
    img.width *= MAX_HEIGHT / img.height;
    img.height = MAX_HEIGHT;
  }

  let canvas = new OffscreenCanvas(img.width, img.height);
  var ctx = canvas.getContext("2d");
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, img.width, img.height);

  const imageData = canvas
    .getContext("2d")
    .getImageData(0, 0, img.width, img.height);
  return imageData;
};
