import destroy from "./destroy";
import filterImages from "./filter-images";
import initializeProject from "./initialize-project";
import reset from "./reset";

/**
 * Exposes the message-handler factories.
 * For testing purposes, the dependencies must be passes down to the handlers before usage.
 */
export default {
	destroy,
	filterImages,
	initializeProject,
	reset,
};
