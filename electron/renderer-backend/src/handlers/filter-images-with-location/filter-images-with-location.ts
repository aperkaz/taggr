import { types } from "taggr-shared";
import { sendToFrontendType } from "../../message-bus";
import { Type as DatabaseType } from "../../database";
import { Type as imageServiceType } from "../../services/image";
import { ImageWithLocation } from "taggr-shared/src/types";

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
	const allImageMap = db.get("allImages");
	const currentImageHashes = db.get("currentImageHashes");

	let images: types.ImageWithLocation[] = [];

	currentImageHashes.forEach((hash) => {
		const image = allImageMap[hash];
		if (image.location && imageService.doesImagePassFilter(image, filters))
			images.push(image as ImageWithLocation);
	});

	sendToFrontend({
		type: "frontend_set-images-with-location",
		payload: images,
	});
};

export default filterImagesWithLocation;
