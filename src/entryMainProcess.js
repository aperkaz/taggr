const { app, BrowserWindow } = require("electron");
const path = require("path");
const os = require("os");
const isDev = require("electron-is-dev");

// TODO: feature: detect duplicates: https://stackoverflow.com/questions/3383892/is-it-possible-to-detect-duplicate-image-files
// use file size for dictionary, and hash the files in the same size. Results to result array

// TODO: feature: print images in a map: https://github.com/tomchentw/react-google-maps

// TODO: check other TF models for features https://www.tensorflow.org/resources/models-datasets

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  let mainWindow;

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

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Add react dev tools https://www.electronjs.org/docs/tutorial/devtools-extension
    const reactExtension = BrowserWindow.addDevToolsExtension(
      path.join(
        os.homedir(),
        "/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.6.0_0"
      )
    );
    // BrowserWindow.removeDevToolsExtension(reactExtension);
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
  console.log(path.join(__dirname, "index.html"));
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Remove menu bar
  mainWindow.removeMenu();
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
