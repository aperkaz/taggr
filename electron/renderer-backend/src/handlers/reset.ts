/**
 * Reset current project
 */
const reset = () => {
	db.set(PROPERTIES.CURRENT_IMAGE_HASHES, []);
};

export default reset;
