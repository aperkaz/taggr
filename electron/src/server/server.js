let serverHandlers = require("./server-handlers");
let ipc = require("./server-ipc");

let isDev, version;

// TODONOW: move to subfolder
const tf = require("@tensorflow/tfjs-node");
const mobilenet = require("@tensorflow-models/mobilenet");

const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

(async () => {
  // await initialize();
  // for (var i = 0; i < 100; i++) {
  //   console.log(await classify("/home/alain/Desktop/pics/pictures/0.jpg"));
  // }
})();

let net;

async function initialize() {
  console.time("loadModel");
  net = await mobilenet.load();
  console.timeEnd("loadModel");
}

async function classify(imgPath) {
  console.time("getUint");
  let uint8array = await getUint8ArrayFromImage(imgPath);
  console.timeEnd("getUint");

  console.time("decode image");
  let imageTensor = await tf.node.decodeImage(uint8array);
  console.timeEnd("decode image");

  console.time("classify");
  const predictions = await net.classify(imageTensor);
  console.timeEnd("classify");

  console.log("detect" + imgPath);

  //clean up
  uint8array = null;
  imageTensor.dispose();
  imageTensor = null;

  return predictions;
}

async function getUint8ArrayFromImage(path) {
  const image = await readFile(path);
  const buf = Buffer.from(image);
  return new Uint8Array(buf);
}

/// NEW BACKEND

/**
 * Initialize the backend and the node-ipc sockects
 * The backend will be initialized inside window in development and as subprocess in production
 */
if (process.argv[2] === "--subprocess") {
  isDev = false;
  version = process.argv[3];

  let socketName = process.argv[4];
  ipc.init(socketName, serverHandlers);
} else {
  let { ipcRenderer, remote } = require("electron");
  isDev = true;
  version = remote.app.getVersion();

  ipcRenderer.on("set-socket", (event, { name }) => {
    ipc.init(name, serverHandlers);
  });
}
