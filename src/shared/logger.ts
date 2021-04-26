/* eslint-disable */
// @ts-nocheck
import activeEnv, { ENVS } from "./active-env";
import Sentry from "./sentry";

let logger = console;

if (activeEnv === ENVS.BUILD_PROD) {
  logger = require("electron-timber"); // will hide the console.logs
}

logger = {
  ...logger,
  error: (e: any) => {
    console.error(e);
    Sentry.captureException(e);
  },
};

export default logger;
