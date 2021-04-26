/* eslint-disable */
// @ts-nocheck
const { app, BrowserWindow, nativeTheme } = require("electron");
const path = require("path");
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} = require("electron-devtools-installer");

declare const FE_WINDOW_WEBPACK_ENTRY: any;
declare const BE_WINDOW_WEBPACK_ENTRY: any;

// Initialize sentry
import "./shared/sentry";

// Active env
import activeEnv, { ENVS } from "./shared/active-env";
import envPaths from "./BE/utils/env-paths";
console.log("Electron environment: ", activeEnv);

// Set OS variable
const isWin = process.platform === "win32";
const isLinux = ["aix", "freebsd", "linux", "openbsd", "sunos"].includes(
  process.platform
);
const isMac = process.platform === "darwin";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let frontendWindow: any;

const createWindow = () => {
  // Create the FE window
  frontendWindow = new BrowserWindow({
    x: 0,
    y: 0,
    icon: isWin
      ? `${path.join(__dirname, "../resources/iconWindows.ico")}`
      : `${path.join(__dirname, "../resources/iconLinux.png")}`,
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false,
      webSecurity: false,
    },
  });
  frontendWindow.loadURL(FE_WINDOW_WEBPACK_ENTRY);

  if (activeEnv === ENVS.DEVELOP || activeEnv === ENVS.BUILD_TEST) {
    frontendWindow.webContents.openDevTools();
  }

  // Create the BE window
  const backendWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: activeEnv === ENVS.DEVELOP || activeEnv === ENVS.BUILD_TEST,
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false,
      webSecurity: false,
    },
  });
  backendWindow.loadURL(BE_WINDOW_WEBPACK_ENTRY);

  if (activeEnv === ENVS.DEVELOP || activeEnv === ENVS.BUILD_TEST) {
    backendWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  frontendWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    frontendWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

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
  if (frontendWindow === null) {
    createWindow();
  }
});

// Add extensions: https://github.com/MarshallOfSound/electron-devtools-installer
app.whenReady().then(() => {
  if (activeEnv === ENVS.DEVELOP || activeEnv === ENVS.BUILD_TEST) {
    installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
      .then((name: string) => console.log(`Added Extension:  ${name}`))
      .catch((err: string) => console.log("An error occurred: ", err));
  }

  const { ipcMain } = require("electron");
  ipcMain.on("restart", () => {
    app.relaunch();
    app.exit();
  });

  // create folder if it doesnt exist
  const fs = require("fs");

  if (!fs.existsSync(envPaths.data)) {
    fs.mkdirSync(envPaths.data);
  }
});
