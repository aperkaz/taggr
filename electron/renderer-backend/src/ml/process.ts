import { getTags } from "./calculate-tags";
import imageService from "../services/image";

// TODONOW: add proper types
/**
 * Extract all the information form an image
 * @returns {{location: {latitude: number, longitude: number}, tags: string[], creationDate: number}}
 */
const process = async (imagePath: string) => {
	console.log("processing image: ", imagePath);
	// @ts-ignore
	const tags = await getTags(imagePath);
	console.log("tags: ", tags);
	const location = await imageService.getLocation(imagePath);
	console.log("location: ", JSON.stringify(location));

	const creationDate = await imageService.getCreationDate(imagePath);

	const imageData = {
		location,
		tags,
		creationDate,
	};

	return imageData;
};

export default process;
