const Sentry = require("@sentry/node");
const { isBuildTestEnv, isBuildProductionEnv } = require("../env");

if (isBuildTestEnv()) {
  Sentry.init({
    dsn:
      "https://9ad8bdd25bfc41c490af68363ac25a6d@o385452.ingest.sentry.io/5280241",
    environment: "build-test",
  });
}

if (isBuildProductionEnv()) {
  Sentry.init({
    dsn:
      "https://9ad8bdd25bfc41c490af68363ac25a6d@o385452.ingest.sentry.io/5280241",
    environment: "build-production",
  });
}
