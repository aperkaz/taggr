"use strict";
const path = require("path");
const { app, BrowserWindow, Menu } = require("electron");
/// const {autoUpdater} = require('electron-updater');
const { is } = require("electron-util");
const unhandled = require("electron-unhandled");
const debug = require("electron-debug");
const contextMenu = require("electron-context-menu");
const config = require("./config.js");
const menu = require("./menu.js");

try {
	require("electron-reloader")(module, {
		ignore: ["dist", "render-backend/src", "noise.png"],
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
		show: false,
		width: 600,
		height: 400,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
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

	await win.loadFile(path.join(__dirname, "render-backend", "index.html"));

	return win;
};
const createFrontendWindow = async () => {
	const win = new BrowserWindow({
		title: app.name,
		show: false,
		width: 600,
		height: 400,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
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

	await win.loadFile(path.join(__dirname, "render-frontend", "index.html"));

	return win;
};

// Prevent multiple instances of the app
if (!app.requestSingleInstanceLock()) {
	app.quit();
}

app.on("second-instance", () => {
	if (backendWindow) {
		if (backendWindow.isMinimized()) {
			backendWindow.restore();
		}

		backendWindow.show();
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

	const favoriteAnimal = config.get("favoriteAnimal");
	backendWindow.webContents.executeJavaScript(
		`document.querySelector('header p').textContent = 'Your favorite animal is ${favoriteAnimal}'`
	);
})();
