// Inspiration article: https://kilianvalkhof.com/2018/apps/using-google-analytics-to-gather-usage-statistics-in-electron/
// TODO: improvement: setup event tracking plan

const { app } = require("electron");
const isDev = require("electron-is-dev");

const ua = require("universal-analytics");
const { v4: uuid } = require("uuid");
const { JSONStorage } = require("node-localstorage");
const nodeStorage = new JSONStorage(app.getPath("userData"));

// Retrieve the userid value, and if it's not there, assign it a new uuid.
const userId = nodeStorage.getItem("userid") || uuid();

// (re)save the userid, so it persists for the next app session.
nodeStorage.setItem("userid", userId);

const usr = ua("UA-164532505-3", userId);

// track only production data
function trackEvent(category, action, label, value) {
  if (isDev) return;

  usr
    .event({
      ec: category,
      ea: action,
      el: label,
      ev: value,
    })
    .send();
}

module.exports = { trackEvent };
