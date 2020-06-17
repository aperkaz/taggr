const get = require("lodash.get");

/**
 * Set env in nodejs
 *
 * @param {('dev'| 'build-test'|'build-production'| string)} env
 */
const setEnvironment = (env) => {
  process.env.TAGGR_ENV = env;
};

const isDevEnv = () => {
  const env = get(process.env, "TAGGR_ENV", "");
  return env === "dev";
};

const isBuildTestEnv = () => {
  const env = get(process.env, "TAGGR_ENV", "");
  return env === "build-test";
};
const isBuildProductionEnv = () => {
  const env = get(process.env, "TAGGR_ENV", "");
  return env === "build-production";
};

module.exports = {
  setEnvironment,
  isDevEnv,
  isBuildTestEnv,
  isBuildProductionEnv,
};
