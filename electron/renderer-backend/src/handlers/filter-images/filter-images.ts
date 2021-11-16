import { types } from "taggr-shared";
import { sendToFrontendType } from "../../message-bus";
import { Type as DatabaseType } from "../../database";
import { Type as imageServiceType } from "../../services/image";

type Deps = {
	db: DatabaseType;
	imageService: imageServiceType;
	sendToFrontend: sendToFrontendType;
};

/**
 * Filter images and send them to the FE
 */
const filterImages = ({ db, imageService, sendToFrontend }: Deps) => (
	filters: types.Filters
) => {
	const imageMap = db.get("allImages");
	const currentImageHashes = db.get("currentImageHashes");

	const filtered = imageService.filterImages({
		imageMap,
		currentImageHashes,
		filters,
	});

	sendToFrontend({
		type: "frontend_set-images",
		payload: filtered,
	});
};

export default filterImages;
