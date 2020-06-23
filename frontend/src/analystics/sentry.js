import * as Sentry from "@sentry/browser";
import { isBuildTestEnv, isBuildProductionEnv } from "../environment";

const initializeSentry = () => {
  if (isBuildTestEnv()) {
    Sentry.init({
      dsn:
        "https://883dbbbb8fc14bd08873a0847a50826e@o385452.ingest.sentry.io/5280123",
      environment: "build-test",
    });
  }

  if (isBuildProductionEnv()) {
    Sentry.init({
      dsn:
        "https://883dbbbb8fc14bd08873a0847a50826e@o385452.ingest.sentry.io/5280123",
      environment: "build-production",
    });
  }
};

const sentry = initializeSentry();
export default sentry;
