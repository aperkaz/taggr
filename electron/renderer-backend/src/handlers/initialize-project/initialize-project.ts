import path from "path";

import { types } from "taggr-shared";
import { sendToFrontendType } from "../../message-bus";
import { Type as dbType } from "../../database";
import { Type as fileServiceType } from "../../services/file";
import { Type as imageServiceType } from "../../services/image";
import { Type as machineLearningServiceType } from "../../services/machine-learning";

type Deps = {
	db: dbType;
	fileService: fileServiceType;
	imageService: imageServiceType;
	machineLearningService: machineLearningServiceType;
	sendToFrontend: sendToFrontendType;
};

/**
 * Init project, preprocess images and populate DB
 */
const initializeProject = ({
	db,
	fileService,
	imageService,
	machineLearningService,
	sendToFrontend,
}: Deps) => async (rootPath: string) => {
	console.log("[BE] initialized project in: ", rootPath);

	// 0. update FE route to pre-processing, send progress and supporter status
	sendToFrontend({
		type: "frontend_set-route",
		payload: "PRE_PROCESSING_PAGE",
	});

	// 1. Locate image paths in project
	const imagePaths = await fileService.recursivelyFindImages(rootPath);

	// 2. Generate in memory structure, and calculate the file hashes
	const temporaryImageMap: types.ImageHashMap = {};
	for (const imagePath of imagePaths) {
		const hash = await fileService.generateFileHash(imagePath);
		temporaryImageMap[hash] = {
			hash,
			path: fileService.normalizePath(imagePath),
			rawPath: imagePath,
			location: null,
			tags: [],
			creationDate: new Date().getTime(),
		};
	}

	// 3. Process images (only the new ones, when the hash is not stored in DB)
	const storedImageMap = db.get("allImages");
	const newImageHashes = Object.keys(temporaryImageMap);

	// only re-calculate new images (non-existing hashes)
	let count = 0;
	for (const hash of newImageHashes) {
		count++;

		sendToFrontend({
			type: "frontend_set-progress",
			payload: {
				current: count,
				total: newImageHashes.length,
			},
		});

		const image = temporaryImageMap[hash];

		// if exists, update temp map and update DB
		if (storedImageMap[hash]) {
			temporaryImageMap[hash] = {
				...temporaryImageMap[hash], // update location, as it may have changed
				tags: storedImageMap[hash].tags,
				location: storedImageMap[hash].location,
				creationDate: storedImageMap[hash].creationDate,
			};

			db.set(`allImages.${hash}`, {
				...temporaryImageMap[hash], // update location, as it may have changed
				tags: storedImageMap[hash].tags,
				location: storedImageMap[hash].location,
				creationDate: storedImageMap[hash].creationDate,
			});
		} else {
			// if doenst exists, process, update temp map and persist in DB
			try {
				const tags = (await machineLearningService.generateImageTags(
					await imageService.loadImageFile(image.rawPath)
				)) as any;
				const location = await imageService.getLocation(image.rawPath);
				const creationDate =
					(await imageService.getCreationDate(image.rawPath)) || 0;

				temporaryImageMap[hash] = {
					...temporaryImageMap[hash], // update location, as it may have changed
					tags,
					location,
					creationDate,
				};

				db.set(`allImages.${hash}`, {
					...temporaryImageMap[hash],
					tags,
					location,
					creationDate,
				});
			} catch (error) {
				// Images which cant be processed, are ommitted
				console.log(`Error processing: ${image.path}`);
				console.error(error);
			}
		}
	}

	// 5. Update DB with current image hashes
	db.set("currentImageHashes", Object.keys(temporaryImageMap));

	// 6. Send images to FE
	sendToFrontend({
		type: "frontend_set-images",
		payload: imageService.imageHashMapToImageList(temporaryImageMap),
	});
	sendToFrontend({
		type: "frontend_set-images-with-location",
		payload: imageService.imageHashMapToImageListWithLocation(
			temporaryImageMap
		),
	});

	// 7. Update FE route
	sendToFrontend({
		type: "frontend_set-route",
		payload: "DASHBOARD_PAGE",
	});
};

export default initializeProject;
