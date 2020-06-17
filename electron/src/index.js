const { app, BrowserWindow } = require("electron");
let { fork } = require("child_process");
let path = require("path");
const os = require("os");

let findOpenSocket = require("./find-open-socket");
const isDev = require("electron-is-dev");

let clientWin;
let serverWin;
let serverProcess;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createClientWindow = (socketName) => {
  // Create the browser window.
  clientWin = new BrowserWindow({
    x: 900,
    y: 0,
    width: 1000,
    height: 1000,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      preload: __dirname + "/client-preload.js",
    },
  });

  // and load the index.html of the app.
  clientWin.loadURL(
    isDev
      ? "http://localhost:3001"
      : `file://${path.join(__dirname, "../frontend-statics/index.html")}`
  );
  // clientWin.loadURL(
  //   `file://${path.join(__dirname, "../frontend-statics/index.html")}`
  // );

  clientWin.webContents.on("did-finish-load", () => {
    clientWin.webContents.send("set-socket", {
      name: socketName,
    });
  });

  // Add react dev tools https://www.electronjs.org/docs/tutorial/devtools-extension
  const reactExtension = BrowserWindow.addDevToolsExtension(
    path.join(
      os.homedir(),
      "/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.7.0_0"
    )
  );
  // BrowserWindow.removeDevToolsExtension(reactExtension);

  // Add redux dev tools https://stackoverflow.com/questions/59538654/electron-add-redux-devtools
  const reduxExtension = BrowserWindow.addDevToolsExtension(
    path.join(
      os.homedir(),
      "/.config/google-chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0"
    )
  );
  // BrowserWindow.removeDevToolsExtension(reduxExtension);

  // Note: devTools must be open manually, they dont load when loading webcontents by url: https://github.com/electron/electron/issues/17799
  // clientWin.removeMenu();
};

const createBackgroundWindow = (socketName) => {
  serverWin = new BrowserWindow({
    x: 0,
    y: 0,
    width: 900,
    height: 600,
    show: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  serverWin.loadURL(`file://${__dirname}/server/server-dev.html`);

  // Open the DevTools
  serverWin.webContents.openDevTools();

  serverWin.webContents.on("did-finish-load", () => {
    serverWin.webContents.send("set-socket", { name: socketName });
  });
};

const createBackgroundProcess = (socketName) => {
  serverProcess = fork(__dirname + "/server/index.js", [
    "--subprocess",
    app.getVersion(),
    socketName,
  ]);

  serverProcess.on("message", (msg) => {
    console.log(msg);
  });
};

const initializeApp = async () => {
  let serverSocket = await findOpenSocket();

  createClientWindow(serverSocket);

  if (isDev) {
    createBackgroundWindow(serverSocket);
  } else {
    createBackgroundProcess(serverSocket);
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", initializeApp);

// App close handler
app.on("before-quit", function () {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
  // TODONOW: if works, remove
  // if (serverProc) serverProc.kill("SIGINT");
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", async () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    initializeApp();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
