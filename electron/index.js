let electron = require('electron');
let { app, BrowserWindow } = require('electron');
let { fork } = require('child_process');
let isDev = require('electron-is-dev');

let findOpenSocket = require('./find-open-socket');

let clientWin;
let serverWin;
let serverProcess;

function createWindow(socketName) {
  clientWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/client-preload.js'
    }
  });

  clientWin.loadFile('client-index.html');

  clientWin.webContents.on('did-finish-load', () => {
    clientWin.webContents.send('set-socket', {
      name: socketName
    });
  });
}

function createBackgroundWindow(socketName) {
  const win = new BrowserWindow({
    x: 500,
    y: 300,
    width: 700,
    height: 500,
    show: true,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.loadURL(`file://${__dirname}/backend/build/server-dev.html`);

  win.webContents.on('did-finish-load', () => {
    win.webContents.send('set-socket', { name: socketName });
  });

  serverWin = win;
}

function createBackgroundProcess(socketName) {
  serverProcess = fork(__dirname + '/backend/build/server.js', [
    '--subprocess',
    app.getVersion(),
    socketName
  ]);

  serverProcess.on('message', (msg) => {
    console.log(msg);
  });
}

app.on('ready', async () => {
  serverSocket = await findOpenSocket();

  createWindow(serverSocket);

  if (isDev) {
    createBackgroundWindow(serverSocket);
  } else {
    createBackgroundProcess(serverSocket);
  }
});

app.on('before-quit', () => {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
});
