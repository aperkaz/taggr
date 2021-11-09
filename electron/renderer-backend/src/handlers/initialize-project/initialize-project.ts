import path from "path";
import get from "lodash.get";
import throttle from "lodash.throttle";

import { types } from "taggr-shared";
import { sendToFrontendType } from "../../message-bus";
import { Type as dbType } from "../../database";
import { Type as fileServiceType } from "../../services/file";
import { Type as imageServiceType } from "../../services/image";
// TODONOW: pass w dependence injection
import process from "../../ml";
import preProcessImages from "../../services/pre-process-images";
import { isForInStatement } from "typescript";
import { getTags } from "../../ml/calculate-tags";

type Deps = {
	db: dbType;
	fileService: fileServiceType;
	imageService: imageServiceType;
	sendToFrontend: sendToFrontendType;
};

/**
 * Init project, preprocess images and populate DB
 */
const initializeProject = ({
	db,
	fileService,
	imageService,
	sendToFrontend,
}: Deps) => async (rootPath: string) => {
	console.log("[BE] initialized project in: ", rootPath);

	// 0. update FE route to pre-processing, send progress and supporter status
	sendToFrontend({ type: "frontend_set-is-processing", payload: true });
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
			path: fileService.normalizePath(
				path.join(fileService.getDataDirectory(), `${hash}.jpeg`)
			),
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

		// if exists, preserve the existing metadata and update DB
		if (storedImageMap[hash]) {
			db.set(`allImages.${hash}`, {
				...temporaryImageMap[hash],
				tags: storedImageMap[hash].tags,
				location: storedImageMap[hash].location,
				creationDate: storedImageMap[hash].creationDate,
			});
		} else {
			db.set(`allImages.${hash}`, {
				...temporaryImageMap[hash],
				tags: await getTags(await imageService.loadImageFile(image.rawPath)),
				location: await imageService.getLocation(image.rawPath),
				creationDate: await imageService.getCreationDate(image.rawPath),
			});
		}
	}

	// 5. Update DB with current image hashes
	db.set("currentImageHashes", Object.keys(temporaryImageMap));

	// 6. Send images to FE
	sendToFrontend({
		type: "frontend_set-images",
		payload: imageService.imageHashMapToImageList(temporaryImageMap),
	});

	// 7. Update FE route
	sendToFrontend({
		type: "frontend_set-route",
		payload: "DASHBOARD_PAGE",
	});
};

export default initializeProject;
