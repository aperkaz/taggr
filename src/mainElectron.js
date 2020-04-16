const { app, BrowserWindow } = require("electron");
const path = require("path");
const os = require("os");
const isDev = require("electron-is-dev");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      // allows to load local files -> file:///
      webSecurity: false,
    },
  });

  // and load the index.html of the app.
  console.log("loading add from: ", MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // if (isDev) {
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  // }

  // Add react dev tools https://www.electronjs.org/docs/tutorial/devtools-extension
  // const reactExtension = BrowserWindow.addDevToolsExtension(
  //   path.join(
  //     os.homedir(),
  //     "/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.6.0_0"
  //   )
  // );
  // BrowserWindow.removeDevToolsExtension(reactExtension);

  // Remove menu
  mainWindow.removeMenu();

  mainWindow.setPosition(1000, 0);

  // child process spawn
  const fs = require("fs");
  const child_process = require("child_process");
  for (var i = 0; i < 1; i++) {
    var worker_process = child_process.fork("src/child.js", [i]);
    worker_process.on("message", (message) =>
      console.log("from worker: ", message)
    );
    worker_process.on("close", function (code, signal) {
      console.log(
        "child process exited with code " + code + " signal: " + signal
      );
    });
  }

  var request = require("request");
  request("http://localhost:8081", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body); // Print the google web page.
    }
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
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
app.on("");
