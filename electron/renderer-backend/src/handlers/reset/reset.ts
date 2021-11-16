import { Type as DatabaseType } from "../../database";

/**
 * Reset current project
 */
const reset = ({ db }: { db: DatabaseType }) => () => {
	db.set("currentImageHashes", []);
};

export default reset;
