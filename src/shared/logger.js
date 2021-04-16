let customLogger;

if (process.env.NODE_ENV === "test") {
  customLogger = console;
} else {
  customLogger = require("electron-timber");
}

export default customLogger;
