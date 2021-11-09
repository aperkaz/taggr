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
	const allImageMap = db.get("allImages");
	const currentImageHashes = db.get("currentImageHashes");

	let images: types.Image[] = [];

	currentImageHashes.forEach((hash) => {
		const image = allImageMap[hash];
		if (imageService.doesImagePassFilter(image, filters)) images.push(image);
	});

	// TODONOW: look into filtering those
	// Images with location
	// Object.keys(imageMap).forEach((key) => {
	//   const image = imageMap[key];

	//   if (filterImage(image, filters)) {
	//     imagesWithLocation.push(image);
	//   }
	// });

	sendToFrontend({
		type: "frontend_set-images",
		payload: images,
	});
};

export default filterImages;
