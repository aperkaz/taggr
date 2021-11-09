import path from "path";
import get from "lodash.get";

import { types } from "taggr-shared";
import { sendToFrontend } from "../../message-bus";
import db from "../../database";
import findImagesInPath from "../../services/file";
import generateFileHash from "../../services/generate-file-hash";
import envPaths from "../../env-paths";
import normalizePath from "../../services/normalize-path";
import preProcessImages from "../../services/pre-process-images";
import transformImageMaptoImageList from "../../services/image-map-to-image-list";

// TODONOW: use dep injection for services

/**
 * Init project, preprocess images and populate DB
 */
const initializeProject = async (rootPath: string) => {
	console.log("[BE] initialized project in: ", rootPath);

	// 0. update FE route to pre-processing, send progress and supporter status
	sendToFrontend({ type: "frontend_set-is-processing", payload: true });
	sendToFrontend({
		type: "frontend_set-route",
		payload: "PRE_PROCESSING_PAGE",
	});

	// 1. Locate image paths in project
	const imagePaths = await fileService.findImagesInPath(rootPath);

	// 2. Generate in memory structure, and calculate the file hashes
	const imageMap: types.ImageHashMap = {};
	for (const imagePath of imagePaths) {
		const hash = await generateFileHash(imagePath);
		imageMap[hash] = {
			hash,
			path: normalizePath(path.join(envPaths.data, `${hash}.jpeg`)),
			rawPath: imagePath,
			location: null,
			tags: [],
			creationDate: new Date().getTime(),
		};
	}

	// 3. Pre-process images (with sharp)
	// TODONOW: verify that there is a perf bottleneck here - consider removing to support windows!
	// const throttledPost = throttle(sendToFrontend, 100);
	const throttledPost = sendToFrontend;
	await preProcessImages(imageMap, envPaths.data, (processed: number) =>
		throttledPost({
			type: "frontend_set-progress",
			payload: {
				current: processed,
				total: imagePaths.length,
			},
		})
	);
	await new Promise((r) => setTimeout(r, 150));

	// 4. Update DB with all images
	const storedImageMap = db.get("allImages");
	Object.keys(imageMap).map((hash) => {
		if (get(storedImageMap, `${hash}.tags`, false)) {
			imageMap[hash] = {
				...imageMap[hash],
				// preserve the existing processed metadata
				tags: storedImageMap[hash].tags,
				location: storedImageMap[hash].location,
				creationDate: storedImageMap[hash].creationDate,
			};
		}
	});
	db.set("allImages", { ...storedImageMap, ...imageMap });

	// 5. Update DB with current image hashes
	db.set("currentImageHashes", Object.keys(imageMap));

	// 6. Send images to FE
	sendToFrontend({
		type: "frontend_set-images",
		payload: transformImageMaptoImageList(imageMap),
	});

	// 7. Update FE route
	sendToFrontend({
		type: "frontend_set-route",
		payload: "DASHBOARD_PAGE",
	});
};

export default initializeProject;
