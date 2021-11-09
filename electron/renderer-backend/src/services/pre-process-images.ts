import fs from "fs";
import path from "path";
import { ImageHashMapType } from "../../shared/entities";
import logger from "../../shared/logger";

// TODONOW: move this to the handler level

/**
 * Pre-process only the images that dont exist
 */
const preProcessImages = async (
	imageMap: ImageHashMapType,
	outputPath: string,
	reporter: any
) => {
	logger.time("preProcessImages");

	const hashes = Object.keys(imageMap);

	const resizePromises = [];

	let processed = 0;
	for (const hash of hashes) {
		reporter(processed++);

		const image = imageMap[hash];

		const preProcessedImagePath = path.join(outputPath, `${image.hash}.jpeg`);

		const fileExists = await doesFileExist(preProcessedImagePath);

		if (!fileExists) {
			try {
				// await resizeImage(image.rawPath, preProcessedImagePath);
				resizePromises.push(resizeImage(image.rawPath, preProcessedImagePath));
			} catch (err) {
				logger.error(err);
			}
		}
	}

	await Promise.all(resizePromises);

	logger.timeEnd("preProcessImages");
};

export default preProcessImages;
