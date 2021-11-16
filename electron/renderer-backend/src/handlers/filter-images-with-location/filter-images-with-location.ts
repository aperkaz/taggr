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
 * Filter images with location and send them to the FE
 */
const filterImagesWithLocation = ({
	db,
	imageService,
	sendToFrontend,
}: Deps) => (filters: types.Filters) => {
	const imageMap = db.get("allImages");
	const currentImageHashes = db.get("currentImageHashes");

	const filtered = imageService.filterImagesWithLocation({
		imageMap,
		currentImageHashes,
		filters,
	});

	sendToFrontend({
		type: "frontend_set-images-with-location",
		payload: filtered,
	});
};

export default filterImagesWithLocation;
