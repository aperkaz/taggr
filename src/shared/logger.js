let customLogger = {};

if (process.env.NODE_ENV === "test") {
  customLogger = console;
} else {
  const logger = require("electron-timber");

  customLogger = {
    ...logger,
    error: (e) => {
      // TODONOW: make sure this works!
      console.log("REPORT ERROR TO SENTRY");
      logger.error(e);
    },
  };
}

export default customLogger;
