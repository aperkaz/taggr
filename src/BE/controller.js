import path from "path";
import get from "lodash.get";

import { MESSAGE_CREATORS } from "../shared/message-passing";
import FE_ROUTES from "../shared/fe-routes";
import { ImageFactory } from "../shared/entities";
import logger from "../shared/logger";

import messageHandler from "./message-handler";

import generateFileHash from "./utils/generate-file-hash";
import normalizePath from "./utils/normalize-path";
import findImagePaths from "./utils/find-images-in-path";
import preProcessImages from "./utils/pre-process-images";
import envPaths from "./utils/env-paths";
import db, { PROPERTIES } from "./utils/db";
import loadImage from "./utils/load-image";
import transformImageMaptoImageList from "./utils/image-map-to-image-list";

import { getTags } from "./ml/calculate-tags";

/**
 * Init project, preprocess images and populate DB
 * @param {string} rootPath
 */
const initializeProject = async (rootPath) => {
  /**
   * @type {import("../shared/entities").ImageHashMapType}
   */
  const imageMap = {};

  logger.log("[BE] create(): ", rootPath);

  // 0. Locate image paths in project
  const imagePathsInProject = await findImagePaths(rootPath);

  // 1. update FE route to pre-processing and send progress
  messageHandler.postMessage(
    MESSAGE_CREATORS.FE_setProgress({
      current: 0,
      total: imagePathsInProject.length,
    })
  );
  messageHandler.postMessage(
    MESSAGE_CREATORS.FE_setRoute(FE_ROUTES.PRE_PROCESSING_PAGE)
  );

  // 2. Generate in memory structure, and calculate the file hashes
  for (const imagePath of imagePathsInProject) {
    const hash = await generateFileHash(imagePath);
    imageMap[hash] = ImageFactory({
      hash,
      path: normalizePath(path.join(envPaths.data, `${hash}.jpg`)),
      rawPath: imagePath,
    });
  }

  // 3. Pre-process images (sharp small)
  await preProcessImages(imageMap, envPaths.data);

  // 4. Update DB with all images
  const storedImageMap = db.get(PROPERTIES.ALL_IMAGES);
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
  db.set(PROPERTIES.CURRENT_IMAGE_HASES, Object.keys(imageMap));

  // 6. Send images to FE
  messageHandler.postMessage(
    MESSAGE_CREATORS.FE_setImages(transformImageMaptoImageList(imageMap))
  );

  // 7. Update FE route
  messageHandler.postMessage(
    MESSAGE_CREATORS.FE_setRoute(FE_ROUTES.DASHBOARD_PAGE)
  );

  // 8. update progress
  messageHandler.postMessage(
    MESSAGE_CREATORS.FE_setProgress({
      current: 0,
      total: 0,
    })
  );

  process();
};

/**
 * ML processing, update DB entries
 */
const process = async () => {
  /**
   * @type {import("../shared/entities").ImageHashMapType}
   */
  const allImageMap = db.get(PROPERTIES.ALL_IMAGES);
  /**
   * @type {string[]}
   */
  const currentImageHashes = db.get(PROPERTIES.CURRENT_IMAGE_HASES);

  // 0. Look for images to process (skip the existing ones)
  const imageHashToProcess = currentImageHashes.filter(
    (hash) => !get(allImageMap, `${hash}.tags`, false)
  );

  messageHandler.postMessage(
    MESSAGE_CREATORS.FE_setProgress({
      current: 0,
      total: imageHashToProcess.length,
    })
  );

  // 1. ML process images
  let processed = 0;
  for (const hash of imageHashToProcess) {
    processed++;

    const image = await loadImage(allImageMap[hash].path);

    const tags = await getTags(image);
    logger.log("tags: ", tags);

    // TODONOW: look for location here too

    // store results
    db.set(`${PROPERTIES.ALL_IMAGES}.${hash}`, { ...allImageMap[hash], tags });
    messageHandler.postMessage(
      MESSAGE_CREATORS.FE_setProgress({
        current: processed,
        total: imageHashToProcess.length,
      })
    );
  }

  MESSAGE_CREATORS.FE_setProgress({
    current: 0,
    total: 0,
  });
};

/**
 * Filter images
 *
 * @param {FilterType} filters
 * @returns {{images: ImageType[], imagesWithLocation: ImageType[]}} images
 */
const filterImages = (filters) => {
  return filterImages(this.imageMap, filters);
};

const reset = () => {
  // TODONOW: reset project
};

const destroy = () => {
  // TODONOW: destroy project
};

export default { initializeProject, process, filterImages };
