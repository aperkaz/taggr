const isDev = require("electron-is-dev");

/**
 * Track Google Analytics event in production. main/analytics
 *
 * @type {eventType} message
 * @typedef {Object} eventType Google analytics events
 * @property {string} category
 * @property {string} action
 * @property {string=} label
 * @property {number=} value
 *
 * @param {eventType} eventType
 */
export default ({ category, action, label = undefined, value = undefined }) => {
  if (isDev) {
    console.log(`event: ${category}, ${action}, ${label}, ${value}`);
  }

  const { getGlobal } = require("electron").remote;
  const trackEvent = getGlobal("trackEvent");
  trackEvent(category, action, label, value);
};
