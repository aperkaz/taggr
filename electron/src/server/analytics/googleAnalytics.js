// Inspiration article: https://kilianvalkhof.com/2018/apps/using-google-analytics-to-gather-usage-statistics-in-electron/
// TODO: improvement: setup event tracking plan

const ua = require("universal-analytics");
const { v4: uuid } = require("uuid");
const { JSONStorage } = require("node-localstorage");
const envPaths = require("env-paths");

const { isBuildTestEnv, isBuildProductionEnv, isDevEnv } = require("../env");

// Setup userid storage
const paths = envPaths("taggr");
const configPath = paths.config;
console.log(`configPath:`, configPath);

const nodeStorage = new JSONStorage(configPath);

// Retrieve the userid value, and if it's not there, assign it a new uuid.
const userId = nodeStorage.getItem("userid") || uuid();

// (re)save the userid, so it persists for the next app session.
nodeStorage.setItem("userid", userId);

// route the analytics to differnet places depending on the env
let usr = null;
if (isBuildTestEnv()) {
  usr = ua("UA-164532505-3", userId);
} else if (isBuildProductionEnv) {
  usr = ua("UA-164532505-4", userId);
}

/**
 * Track Google Analytics event in build-test and build-production. main/analytics
 *
 * @param {{category: string, action: string, label?: string, value?: number?}} eventType Google analytics events
 *
 */
function trackEventInBuild({
  category,
  action,
  label = undefined,
  value = undefined,
}) {
  if (!usr) {
    throw new Error("Google Analytics couldnt be initialized");
  }

  console.log(`event: ${category}, ${action}, ${label}, ${value}`);

  if (isBuildTestEnv() || isBuildProductionEnv()) {
    usr
      .event({
        ec: category,
        ea: action,
        el: label,
        ev: value,
      })
      .send();
  }
}

/**
 * Track when app is opened
 */
function trackAppOpened() {
  trackEventInBuild({ category: "User Interaction", action: "App opened" });
}

/**
 * Track number of images per created project
 * @param {number} imageCount
 */
function trackCreatedProjectImages(imageCount) {
  trackEventInBuild({
    category: "User Interaction",
    action: "Project created",
    label: "Image count",
    value: imageCount,
  });
}

/**
 * Track size of created project
 * @param {number} size
 */
function trackCreatedProjectSize(size) {
  trackEventInBuild({
    category: "User Interaction",
    action: "Project created",
    label: "Size (mb)",
    value: size,
  });
}

module.exports = {
  trackAppOpened,
  trackCreatedProjectImages,
  trackCreatedProjectSize,
};
