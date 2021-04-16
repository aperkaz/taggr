import logger from "../../shared/logger";

/**
 * Log execution performance of function
 * @param {*} func
 * @param {*} name
 * @returns
 */
const logFunctionPerf = (func, name) => async (...args) => {
  const funcName = name ? name : func.name;

  logger.time(funcName);
  const ret = await func(...args);
  logger.timeEnd(funcName);

  return ret;
};

export default logFunctionPerf;
