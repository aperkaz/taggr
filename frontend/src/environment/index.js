import get from "lodash.get";

export const isDevEnv = () => get(window, "IS_DEV", false);

export const isBuildTestEnv = () => get(window, "IS_BUILD_TEST", false);

export const isBuildProductionEnv = () =>
  get(window, "IS_BUILD_PRODUCTION", false);
