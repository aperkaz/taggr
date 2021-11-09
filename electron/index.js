"use strict";
const path = require("path");
const { app, BrowserWindow, Menu } = require("electron");
/// const {autoUpdater} = require('electron-updater');
const { is } = require("electron-util");
const unhandled = require("electron-unhandled");
const debug = require("electron-debug");
const contextMenu = require("electron-context-menu");
const isDev = require("electron-is-dev");
const config = require("./config.js");
const menu = require("./menu.js");
const { messageBus } = require("taggr-shared");

try {
	require("electron-reloader")(module, {
		ignore: ["dist", "renderer-backend/src", "noise.png"],
		// debug: true,
	});
} catch {}

unhandled();
debug();
contextMenu();

// Note: Must match `build.appId` in package.json
app.setAppUserModelId("com.company.AppName");

// Uncomment this before publishing your first version.
// It's commented out as it throws an error if there are no published versions.
// if (!is.development) {
// 	const FOUR_HOURS = 1000 * 60 * 60 * 4;
// 	setInterval(() => {
// 		autoUpdater.checkForUpdates();
// 	}, FOUR_HOURS);
//
// 	autoUpdater.checkForUpdates();
// }

// Prevent window from being garbage collected
let backendWindow;
let frontendWindow;

const createBackendWindow = async () => {
	const win = new BrowserWindow({
		title: app.name,
		show: isDev,
		x: 0,
		y: 0,
		width: 900,
		height: 500,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			webSecurity: false,
			backgroundThrottling: false,
			preload: path.join(__dirname, "preload.js"),
		},
	});

	win.on("ready-to-show", () => {
		win.show();
	});

	win.on("closed", () => {
		// Dereference the window
		// For multiple windows store them in an array
		backendWindow = undefined;
	});

	await win.loadFile(path.join(__dirname, "renderer-backend", "index.html"));

	return win;
};
const createFrontendWindow = async () => {
	const win = new BrowserWindow({
		title: app.name,
		show: false,
		x: 0,
		y: 500,
		width: 900,
		height: 500,
		webPreferences: {
			nodeIntegration: true,
			backgroundThrottling: false,
			contextIsolation: false,
			enableRemoteModule: true,
			preload: path.join(__dirname, "preload.js"),
		},
	});

	win.on("ready-to-show", () => {
		win.show();
	});

	win.on("closed", () => {
		// Dereference the window
		// For multiple windows store them in an array
		frontendWindow = undefined;
	});

	await win.loadURL(
		isDev
			? "http://localhost:3001"
			: `file://${path.join(__dirname, "renderer-frontend/index.html")}`
	);

	return win;
};

// Prevent multiple instances of the app
if (!app.requestSingleInstanceLock()) {
	app.quit();
}

app.on("second-instance", () => {
	if (frontendWindow) {
		if (frontendWindow.isMinimized()) {
			frontendWindow.restore();
		}

		frontendWindow.show();
	}
});

app.on("window-all-closed", () => {
	if (!is.macos) {
		app.quit();
	}
});

app.on("activate", async () => {
	if (!backendWindow) {
		backendWindow = await createBackendWindow();
	}
	if (!frontendWindow) {
		frontendWindow = await createFrontendWindow();
	}
});

(async () => {
	await app.whenReady();
	Menu.setApplicationMenu(menu);
	backendWindow = await createBackendWindow();
	frontendWindow = await createFrontendWindow();

	// send webContentId, so render-to-render ipc communication can happen
	frontendWindow.webContents.send("taggr-ipc-setup", {
		beWebContentId: backendWindow.id,
		feWebContentId: frontendWindow.id,
	});
	backendWindow.webContents.send("taggr-ipc-setup", {
		beWebContentId: backendWindow.id,
		feWebContentId: frontendWindow.id,
	});

	setInterval(() => {
		frontendWindow.webContents.send("taggr-ipc-setup", {
			beWebContentId: backendWindow.id,
			feWebContentId: frontendWindow.id,
		});
		backendWindow.webContents.send("taggr-ipc-setup", {
			beWebContentId: backendWindow.id,
			feWebContentId: frontendWindow.id,
		});
	}, 1000);
	// TODONOW: fix this hack

	console.log(`${backendWindow.id} = ${frontendWindow.id}`);

	const favoriteAnimal = config.get("favoriteAnimal");
	backendWindow.webContents.executeJavaScript(
		`document.querySelector('header p').textContent = 'Your favorite animal is ${favoriteAnimal}'`
	);
})();
