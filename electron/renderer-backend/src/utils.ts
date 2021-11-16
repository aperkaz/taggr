/**
 * Check if array A contains all the elements of array B
 */
export const isArrayContained = (
	arrayA: string[],
	arrayB: string[]
): boolean => {
	if (arrayB.length === 0) return true;

	return arrayB.every((bItem) => arrayA.includes(bItem));
};

/**
 * Translate latlong string to {lat, lon} object
 */
export const toDecimal = (latLongString: string) => {
	var parseDMS = require("parse-dms");
	return parseDMS(latLongString);
};

type AnyFunction = (...args: any[]) => any;

/**
 * Log execution performance of function
 */
export const logFunctionPerf = <Func extends AnyFunction>(
	func: Func,
	name?: string
): ((...args: Parameters<Func>) => ReturnType<Func>) => {
	const funcName = name ? name : func.name;

	const wrappedFn = async (
		...args: Parameters<Func>
	): Promise<ReturnType<Func>> => {
		console.time(funcName);
		const ret = await func(...args);
		console.timeEnd(funcName);

		return ret;
	};

	return wrappedFn as any;
};
