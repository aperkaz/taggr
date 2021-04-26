// @ts-nocheck
import logger from "../../shared/logger";

/**
 * Log execution performance of function
 */
const logFunctionPerf = (func: any, name: any): any => async (...args) => {
  const funcName = name ? name : func.name;

  logger.time(funcName);
  const ret = await func(...args);
  logger.timeEnd(funcName);

  return ret;
};

export default logFunctionPerf;
