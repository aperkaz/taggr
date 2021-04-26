import path from "path";
import get from "lodash.get";
import throttle from "lodash.throttle";

import { MessageType } from "../shared/message-passing";
import FE_ROUTES from "../shared/fe-routes";
import {
  FiltersType,
  ImageFactory,
  ImageHashMapType,
  ImageType,
} from "../shared/entities";
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
import filterImage from "./utils/filter-image";
import getImageLocation from "./utils/get-image-location";
import getImageCreationDate from "./utils/get-image-creation-date";

/**
 * Init project, preprocess images and populate DB
 */
const initializeProject = async (rootPath: string) => {
  const imageMap: ImageHashMapType = {};

  logger.log("[BE] create(): ", rootPath);

  // 0. Locate image paths in project
  const imagePathsInProject = await findImagePaths(rootPath);

  // 1. update FE route to pre-processing and send progress
  messageHandler.postMessage({
    type: MessageType.FE_SET_PROGRESS,
    payload: { current: 0, total: imagePathsInProject.length },
  });
  messageHandler.postMessage({
    type: MessageType.FE_SET_ROUTE,
    payload: FE_ROUTES.PRE_PROCESSING_PAGE,
  });

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
  const throttledPost = throttle(messageHandler.postMessage, 250);
  await preProcessImages(imageMap, envPaths.data, (processed: any) =>
    throttledPost({
      type: MessageType.FE_SET_PROGRESS,
      payload: {
        current: processed,
        total: imagePathsInProject.length,
      },
    })
  );

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
  db.set(PROPERTIES.CURRENT_IMAGE_HASES, Object.keys(imageMap));

  // 6. Send images to FE
  messageHandler.postMessage({
    type: MessageType.FE_SET_IMAGES,
    payload: transformImageMaptoImageList(imageMap),
  });

  // 7. Update FE route
  messageHandler.postMessage({
    type: MessageType.FE_SET_ROUTE,
    payload: FE_ROUTES.DASHBOARD_PAGE,
  });

  // 8. update progress
  messageHandler.postMessage({
    type: MessageType.FE_SET_PROGRESS,
    payload: { current: 0, total: 0 },
  });

  process();
};

/**
 * ML processing, update DB entries
 */
const process = async () => {
  const allImageMap: ImageHashMapType = db.get(PROPERTIES.ALL_IMAGES);
  const currentImageHashes: string[] = db.get(PROPERTIES.CURRENT_IMAGE_HASES);

  // 0. Look for images to process (skip the existing ones)
  const imageHashToProcess = currentImageHashes.filter(
    (hash) => !get(allImageMap, `${hash}.tags`, false)
  );

  messageHandler.postMessage({
    type: MessageType.FE_SET_PROGRESS,
    payload: { current: 0, total: imageHashToProcess.length },
  });

  // 1. ML process images
  let processed = 0;
  for (const hash of imageHashToProcess) {
    processed++;

    const image = await loadImage(allImageMap[hash].path);

    const tags = await getTags(image);
    logger.log("tags: ", tags);

    const location = await getImageLocation(allImageMap[hash].rawPath);
    logger.log("location: ", JSON.stringify(location));

    const creationDate = await getImageCreationDate(allImageMap[hash].rawPath);
    logger.log("creationDate: ", JSON.stringify(creationDate));

    // store results
    db.set(`${PROPERTIES.ALL_IMAGES}.${hash}`, {
      ...allImageMap[hash],
      tags,
      location,
      creationDate,
    });

    messageHandler.postMessage({
      type: MessageType.FE_SET_PROGRESS,
      payload: { current: processed, total: imageHashToProcess.length },
    });
  }

  messageHandler.postMessage({
    type: MessageType.FE_SET_PROGRESS,
    payload: { current: 0, total: 0 },
  });
};

/**
 * Filter images
 */
const filterImages = (filters: FiltersType) => {
  const allImageMap: ImageHashMapType = db.get(PROPERTIES.ALL_IMAGES);
  const currentImageHashes: string[] = db.get(PROPERTIES.CURRENT_IMAGE_HASES);

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
    payload: images,
  });
};

/**
 * Reset current project
 */
const reset = () => {
  db.set(PROPERTIES.CURRENT_IMAGE_HASES, []);
};

/**
 * Clean DB and remove all pre-processed images
 */
const destroy = async () => {
  db.clear();

  const rimraf = require("rimraf");

  rimraf(envPaths.data, { recursive: true }, (err: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log("directory deleted successfully");

      // re-create dir
      const fs = require("fs");
      if (!fs.existsSync(envPaths.data)) {
        fs.mkdirSync(envPaths.data);
      }
    }
  });
};

export default { initializeProject, process, filterImages, reset, destroy };
