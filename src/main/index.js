/**
 * Main electron process.
 * In charge of spinning the renderer and background processes.
 */
const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const logger = require("electron-timber");

// GLOBALS
global.mainWindow = null;
global.backgroundWindow = null;
// global.trackEvent = null;
global.backgroundLogger = logger.create({ name: "background" });

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

let backgroundWindow, mainWindow;

const startApp = () => {
  backgroundWindow = createBackgroundWindow();
  global.backgroundWindow = backgroundWindow;
  logger.log("backgroundWindow created");

  mainWindow = createMainWindow();
  global.mainWindow = mainWindow;
  logger.log("mainWindow created");

  setupGoogleAnalytics();
  logger.log("setup google analytics");
};

function createMainWindow() {
  const devSettings = {
    width: 960,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      webSecurity: false,
    },
  };

  const prodSettings = {
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      webSecurity: false,
    },
  };

  let window = new BrowserWindow(isDev ? devSettings : prodSettings);

  // Load index.html from webpack entry path
  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Close background window on close
  window.on("closed", () => {
    if (backgroundWindow) backgroundWindow.close();
  });

  // Remove menu
  // mainWindow.removeMenu();

  if (isDev) {
    window.setPosition(1200, 0);

    // Open the DevTools.
    window.webContents.openDevTools();

    // Add react dev tools https://www.electronjs.org/docs/tutorial/devtools-extension
    const path = require("path");
    const os = require("os");
    const reactExtension = BrowserWindow.addDevToolsExtension(
      path.join(
        os.homedir(),
        "/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.6.0_0"
      )
    );
    // BrowserWindow.removeDevToolsExtension(reactExtension);

    return window;
  }
}

function createBackgroundWindow() {
  const devSettings = {
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
  };

  const prodSettings = {
    show: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
  };

  let window = new BrowserWindow(isDev ? devSettings : prodSettings);

  window.loadURL(HIDDEN_WINDOW_WEBPACK_ENTRY);

  if (isDev) {
    // Open the DevTools.
    window.webContents.openDevTools();
  }

  // Reset reference on close
  window.on("closed", () => {
    backgroundWindow = null;
  });

  // hiddenWindow.hide();

  return window;
}

const setupGoogleAnalytics = () => {
  // Setup Google Analytics. Triggers events only in non-dev envs
  const { trackEvent } = require("./analytics");
  global.trackEvent = trackEvent;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", startApp);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    startApp();
  }
});
