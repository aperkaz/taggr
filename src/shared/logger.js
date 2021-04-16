let logger = {};

if (process.env.NODE_ENV === "test") {
  logger = console;
} else {
  const electronLogger = require("electron-timber");

  logger = {
    ...electronLogger,
    error: (e) => {
      // TODONOW: make sure this works!
      console.log("REPORT ERROR TO SENTRY");
      electronLogger.error(e);
    },
  };
}

export default logger;
