/**
 * Init project, preprocess images and populate DB
 */
const initializeProject = async (rootPath: string) => {
	const imageMap: ImageHashMapType = {};

	logger.log("[BE] create(): ", rootPath);

	// 0. update FE route to pre-processing, send progress and supporter status
	messageHandler.postMessage({
		type: MessageType.FE_SET_IS_PROCESSING,
		payload: true,
	});
	messageHandler.postMessage({
		type: MessageType.FE_SET_ROUTE,
		payload: FE_ROUTES.PRE_PROCESSING_PAGE,
	});
	messageHandler.postMessage({
		type: MessageType.FE_SET_IS_SUPPORTER,
		payload: db.get(PROPERTIES.IS_SUPPORTER),
	});

	// 1. Locate image paths in project
	const imagePathsInProject = await findImagePaths(rootPath);

	// 2. Generate in memory structure, and calculate the file hashes
	for (const imagePath of imagePathsInProject) {
		const hash = await generateFileHash(imagePath);
		imageMap[hash] = ImageFactory({
			hash,
			path: normalizePath(path.join(envPaths.data, `${hash}.jpeg`)),
			rawPath: imagePath,
			location: null,
		});
	}

	// 3. Pre-process images (sharp small)
	const throttledPost = throttle(messageHandler.postMessage, 100);
	// const throttledPost = messageHandler.postMessage;
	await preProcessImages(imageMap, envPaths.data, (processed: any) =>
		throttledPost({
			type: MessageType.FE_SET_PROGRESS,
			payload: {
				current: processed,
				total: imagePathsInProject.length,
			},
		})
	);
	await new Promise((r) => setTimeout(r, 150));

	// 4. Update DB with all images
	const storedImageMap: ImageHashMapType = db.get(PROPERTIES.ALL_IMAGES);
	Object.keys(imageMap).map((hash) => {
		if (get(storedImageMap, `${hash}.tags`, false)) {
			imageMap[hash] = {
				...imageMap[hash],
				tags: storedImageMap[hash].tags,
				location: storedImageMap[hash].location,
				creationDate: storedImageMap[hash].creationDate,
			};
		}
	});
	db.set(`${PROPERTIES.ALL_IMAGES}`, { ...storedImageMap, ...imageMap });

	// 5. Update DB with current image hashes
	db.set(PROPERTIES.CURRENT_IMAGE_HASHES, Object.keys(imageMap));

	// 6. Send images to FE
	messageHandler.postMessage({
		type: MessageType.FE_SET_IMAGES,
		payload: addImagePlaceholders(transformImageMaptoImageList(imageMap)),
	});

	// 7. Update FE route
	messageHandler.postMessage({
		type: MessageType.FE_SET_ROUTE,
		payload: FE_ROUTES.DASHBOARD_PAGE,
	});

	process();
};

export default initializeProject;
