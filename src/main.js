const { app, BrowserWindow } = require("electron");
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} = require("electron-devtools-installer");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let frontendWindow;

const createWindow = () => {
  // Create the browser window.
  frontendWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  frontendWindow.loadURL(FE_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  frontendWindow.webContents.openDevTools();

  const backendWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: true,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
  });
  backendWindow.loadURL(BE_WINDOW_WEBPACK_ENTRY);
  backendWindow.webContents.openDevTools();

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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Add extensions: https://github.com/MarshallOfSound/electron-devtools-installer
app.whenReady().then(() => {
  installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));
});

// Sharp demo

const sharp = require("sharp");

new Promise((r) => setTimeout(r, 10000)).then(() => {
  for (let i = 0; i < 1; i++) {
    sharp({
      create: {
        width: 480,
        height: 480,
        channels: 4,
        background: { r: 255, g: 0, b: 255, alpha: 0.5 },
      },
    })
      .png()
      .toFile(`/Users/alain/Downloads/output/adios${i}.png`, (err, info) => {
        if (err) {
          console.log("err in test.png: ", err);
        }
        if (info) {
          console.log(i);
          // console.log("test.png info: ", info);
        }
      });
  }
});