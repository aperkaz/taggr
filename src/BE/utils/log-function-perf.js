/**
 * Log execution performance of function
 * @param {*} func
 * @param {*} name
 * @returns
 */
const logFunctionPerf = (func, name) => async (...args) => {
  const funcName = name ? name : func.name;

  console.time(funcName);
  const ret = await func(...args);
  console.timeEnd(funcName);

  return ret;
};

export default logFunctionPerf;
