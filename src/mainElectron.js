const { app, BrowserWindow } = require("electron");
const path = require("path");
const os = require("os");
const isDev = require("electron-is-dev");
const logger = require("electron-timber");

let mainWindow, hiddenWindow;
// TODONOW: refactor for clarity. Re-structure app https://blog.axosoft.com/electron-things-to-know/

// TODONOW: add logging https://github.com/sindresorhus/electron-timber

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindows = () => {
  if (isDev) {
    mainWindow = new BrowserWindow({
      width: 960,
      height: 1080,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        webSecurity: false,
      },
    });

    mainWindow.setPosition(1200, 0);

    // Add react dev tools https://www.electronjs.org/docs/tutorial/devtools-extension
    // const reactExtension = BrowserWindow.addDevToolsExtension(
    //   path.join(
    //     os.homedir(),
    //     "/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.6.0_0"
    //   )
    // );
    // BrowserWindow.removeDevToolsExtension(reactExtension);

    mainWindow.setPosition(1000, 0);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        webSecurity: false,
      },
    });
  }

  // and load the index.html of the app.
  logger.log("loading index.html from: ", MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Cleanup on mainWindow close
  mainWindow.on("closed", () => {
    hiddenWindow.close();
  });

  // Create hidden window, to use as backend
  hiddenWindow = new BrowserWindow({
    // show: false,
    // frame: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
  });
  hiddenWindow.loadURL(HIDDEN_WINDOW_WEBPACK_ENTRY);
  hiddenWindow.webContents.openDevTools();

  // hiddenWindow.hide();

  // Link windows to global context to allow inter render process ipc calls
  global.mainWindow = mainWindow;
  global.hiddenWindow = hiddenWindow;

  // Remove menu
  // mainWindow.removeMenu();

  // Setup Google Analytics. Only triggered in non-dev envs
  const { trackEvent } = require("./analytics");
  global.trackEvent = trackEvent;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindows);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }

  mainWindow.close();
  hiddenWindow.close();

  // global.mainWindow = null;
  // global.hiddenWindow = null;
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindows();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
