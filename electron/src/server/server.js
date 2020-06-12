let serverHandlers = require("./server-handlers");
let ipc = require("./server-ipc");

let isDev, version;

// TODONOW: add environmental variable so the backend returns https: images rather than http: in development

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
