/* eslint-disable */
// @ts-nocheck
import * as Sentry from "@sentry/electron";
import ACTIVE_ENV, { ENVS } from "./active-env";

Sentry.init({
  dsn:
    "https://a22c4f823b9a4111977940f161606e47@o385452.ingest.sentry.io/5724707",
  environment: ACTIVE_ENV,
  // enabled: ACTIVE_ENV === ENVS.BUILD_TEST || ACTIVE_ENV === ENVS.BUILD_PROD,
});

export default Sentry;
