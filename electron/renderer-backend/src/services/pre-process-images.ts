import path from "path";
import { types } from "taggr-shared";
import fileService from "../services/file";
import imageService from "../services/image";

// TODONOW: move this to the handler level?

/**
 * Pre-process only the images that dont exist
 */
const preProcessImages = async (
	imageMap: types.ImageHashMap,
	outputPath: string,
	reporter: any
) => {
	console.time("preProcessImages");

	const hashes = Object.keys(imageMap);

	const resizePromises = [];

	let processed = 0;
	for (const hash of hashes) {
		reporter(processed++);

		const image = imageMap[hash];

		const preProcessedImagePath = path.join(outputPath, `${image.hash}.jpeg`);

		const fileExists = await fileService.doesFileExist(preProcessedImagePath);

		if (!fileExists) {
			try {
				// await resizeImage(image.rawPath, preProcessedImagePath);
				resizePromises.push(
					imageService.resizeImage(image.rawPath, preProcessedImagePath)
				);
			} catch (err) {
				console.error(err);
			}
		}
	}

	await Promise.all(resizePromises);

	console.timeEnd("preProcessImages");
};

export default preProcessImages;
