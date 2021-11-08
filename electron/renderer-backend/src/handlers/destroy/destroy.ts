import { promisify } from "util";

import { DatabaseType } from "../../database";

const rimraf = promisify(require("rimraf"));

/**
 * Clean DB and remove all pre-processed images
 */
const destroy = ({
	db,
	preprocessImagesPath,
}: {
	db: DatabaseType;
	preprocessImagesPath: string;
}) => async () => {
	db.clear();

	try {
		await rimraf(preprocessImagesPath, { recursive: true });
		// re-create dir
		const fs = require("fs");
		if (!fs.existsSync(preprocessImagesPath)) {
			fs.mkdirSync(preprocessImagesPath);
		}
	} catch (error) {
		console.error(error);
	}
};

export default destroy;
