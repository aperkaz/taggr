import { ipcRenderer } from "electron";
import React from "react";
import ReactDOM from "react-dom";
import isDev from "electron-is-dev";
import * as Sentry from "@sentry/browser";
import App from "./App";
import "./index.css";
import logger from "electron-timber";

// Setup crash analytics
if (!isDev)
  Sentry.init({
    dsn:
      "https://c413216c810946559e9d5c1feb34c92f@o385452.ingest.sentry.io/5218191",
  });

// Open all links in external browser
let shell = require("electron").shell;
document.addEventListener("click", function (event) {
  if (event.target.tagName === "A" && event.target.href.startsWith("http")) {
    event.preventDefault();
    shell.openExternal(event.target.href);
  }
});

// Trigger Interaction. App opened
const { getGlobal } = require("electron").remote;
const trackEvent = getGlobal("trackEvent");
trackEvent("User Interaction", "App opened");

// Setup fps analytis in dev
if (isDev) {
  var script = document.createElement("script");
  script.onload = function () {
    var stats = new Stats();
    document.body.appendChild(stats.dom);
    requestAnimationFrame(function loop() {
      stats.update();
      requestAnimationFrame(loop);
    });
  };
  script.src = "//mrdoob.github.io/stats.js/build/stats.min.js";
  document.head.appendChild(script);
}

// TODONOW: move backend communication to queue.Use https://github.com/sindresorhus/electron-timber for better login
// Dummy event to hidden window

// ipcRenderer.on("message", (event, message) => {
//   console.log("main window processing message");
//   console.log(message);
// });

// (() => {
//   setTimeout(() => {
//     let hiddenWindow = getGlobal("hiddenWindow");
//     console.log(hiddenWindow);
//     if (hiddenWindow) {
//       console.log("hidden window found, sending message");
//       hiddenWindow.webContents.send("message", "Message from Window 1");
//     }
//   }, 5000);
// })();

const backendLogger = logger.create({ name: "backend" });
backendLogger.log("Hi from the renderer window");

ReactDOM.render(<App />, document.getElementById("app"));
