require("bytenode");
let ipc = require("./services/helpers");
let serverHandlers = require("./services/handlers");

// setup analytics
require("./analytics/sentry");
const { trackAppOpened } = require("./analytics/googleAnalytics");
trackAppOpened();

let version;

// TODONOW: add environmental variable so the backend returns https: images rather than http: in development

// check if project data exists

// yes, start screen

// no, calculate diff, analyze

/**
 * Initialize the backend and the node-ipc sockects
 * The backend will be initialized inside window in development and as subprocess in production
 */
if (process.argv[2] === "--subprocess") {
  version = process.argv[3];

  let socketName = process.argv[4];
  ipc.init(socketName, serverHandlers);

  console.log("node process: process.env.TAGGR_ENV: ", process.env.TAGGR_ENV);
} else {
  let { ipcRenderer, remote } = require("electron");
  version = remote.app.getVersion();

  ipcRenderer.on("set-socket", (event, { name }) => {
    ipc.init(name, serverHandlers);
  });

  console.log("browser window: process.env.TAGGR_ENV: ", process.env.TAGGR_ENV);
}
