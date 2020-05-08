/**
 * Track Google Analytics event. main/analytics
 * @param {String} category
 * @param {String} action
 */
export default (category, action) => {
  const { getGlobal } = require("electron").remote;
  const trackEvent = getGlobal("trackEvent");
  trackEvent(category, action);
};
