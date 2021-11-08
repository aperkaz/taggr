/**
 * Clean DB and remove all pre-processed images
 */
const destroy = async () => {
	db.clear();

	const rimraf = require("rimraf");

	rimraf(envPaths.data, { recursive: true }, (err: any) => {
		if (err) {
			logger.error(err);
		} else {
			logger.log("directory deleted successfully");

			// re-create dir
			const fs = require("fs");
			if (!fs.existsSync(envPaths.data)) {
				fs.mkdirSync(envPaths.data);
			}
		}
	});
};

export default destroy;
