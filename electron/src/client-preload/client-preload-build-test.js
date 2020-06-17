const { ipcRenderer } = require("electron");
const ipc = require("node-ipc");
const uuid = require("uuid");

let resolveSocketPromise;
let socketPromise = new Promise((resolve) => {
  resolveSocketPromise = resolve;
});

// setup env for frontend
window.IS_DEV = false;
window.IS_BUILD_TEST = true;
window.IS_BUILD_PRODUCTION = false;

window.getServerSocket = () => {
  return socketPromise;
};

ipcRenderer.on("set-socket", (event, { name }) => {
  resolveSocketPromise(name);
});

window.ipcConnect = (id, func) => {
  ipc.config.silent = true;
  ipc.connectTo(id, () => {
    func(ipc.of[id]);
  });
};

window.uuid = uuid;
