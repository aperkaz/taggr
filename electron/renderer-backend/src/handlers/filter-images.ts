import { types } from "taggr-shared";

/**
 * Determine if date is in range
 * Dates in UNIX EPOCH format
 */
const isDateInRange = ({
	date,
	fromDate,
	toDate,
}: {
	date?: number;
	fromDate?: number;
	toDate?: number;
}) => {
	if (!date && date !== 0) {
		if (!fromDate && !toDate) {
			return true;
		}
	}

	if (!fromDate) {
		if (date <= toDate) {
			return true;
		}
	}

	if (!toDate) {
		if (fromDate <= date) {
			return true;
		}
	}

	if (fromDate <= date && date <= toDate) {
		return true;
	}

	return false;
};

/**
 * Check if array A contains all the elements of array B
 */
const arrayContains = (arrayA: string[], arrayB: string[]): boolean => {
	if (arrayB.length === 0) return true;

	return arrayB.every((bItem) => arrayA.includes(bItem));
};

export default (image: types.Image[], filters: types.Filters): Image[] => {
	const { fromDate, toDate, tags: filterTags } = filters;
	const { creationDate, tags: imageTags } = image;

	return (
		isDateInRange({ date: creationDate, fromDate, toDate }) &&
		arrayContains(imageTags, filterTags)
	);
};

/**
 * Filter images
 */
const filterImages = (filters: types.Filters) => {
	const allImageMap: ImageHashMapType = db.get(PROPERTIES.ALL_IMAGES);
	const currentImageHashes: string[] = db.get(PROPERTIES.CURRENT_IMAGE_HASHES);

	let images: ImageType[] = [];

	currentImageHashes.forEach((hash) => {
		const image = allImageMap[hash];
		if (filterImage(image, filters)) images.push(image);
	});

	// Images with location
	// Object.keys(imageMap).forEach((key) => {
	//   const image = imageMap[key];

	//   if (filterImage(image, filters)) {
	//     imagesWithLocation.push(image);
	//   }
	// });

	messageHandler.postMessage({
		type: MessageType.FE_SET_IMAGES,
		payload: addImagePlaceholders(images),
	});
};
