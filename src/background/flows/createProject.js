import {
  setImages,
  setImagesWithLocation,
  setTask,
  setTags,
} from "../../renderer/store";
import { sendToRenderer } from "../services/utils";
import recursivelyFindImages from "../features/recursivelyFindImages";
import generateImageHashMap from "../features/generateImageHashMap";
import generateTags from "../features/generateTags";
import generateLocations, {
  getImagesWihLocation,
} from "../features/generateLocations";
import transformImageMaptoImageList from "../features/transformImageMaptoImageList";
import getTopTags from "../features/getTopTags";

import { setProjectRootFolderPath, setImageHashMap } from "../store";

/**
 * Flow for initializing and generating project.
 * Each flow updates the store information when completed, acting as an atomic operation.
 * @param {string} projectRootFolderPath
 */
const createProject = async (projectRootFolderPath) => {
  // object that contains all the project information
  let imageHashMap = {};

  setProjectRootFolderPath(projectRootFolderPath);

  // notify finding images
  sendToRenderer({
    type: setTask.type,
    payload: {
      isOngoing: true,
      name: "Locating all the pictures!",
      percentage: 0,
    },
  });

  const imagePathsToProcess = await recursivelyFindImages(
    projectRootFolderPath
  );

  imageHashMap = generateImageHashMap(imagePathsToProcess);

  // send initial image list to renderer
  sendToRenderer({
    type: setImages.type,
    payload: transformImageMaptoImageList(imageHashMap),
  });

  // notify finding images
  sendToRenderer({
    type: setTask.type,
    payload: {
      isOngoing: true,
      name: `The robots are extracting the gps data from ${imagePathsToProcess.length} images!`,
      percentage: 0,
    },
  });

  // compute gps position for all images
  console.time("generateAllLocations");
  try {
    imageHashMap = await generateLocations(imageHashMap);
  } catch (e) {
    console.error("issue generating geolocations: ", e);
  }
  console.timeEnd("generateAllLocations");

  // send image list to renderer
  sendToRenderer({
    type: setImagesWithLocation.type,
    payload: getImagesWihLocation(imageHashMap),
  });

  // notify for tag generation
  sendToRenderer({
    type: setTask.type,
    payload: {
      isOngoing: true,
      name: `Be patient, the robots are analysing your ${imagePathsToProcess.length} memories!`,
      percentage: 0,
    },
  });

  // compute tags for all images
  imageHashMap = await generateTags(imageHashMap);

  // calculate top 20 tags, send to renderer
  sendToRenderer({
    type: setTags.type,
    payload: await getTopTags(imageHashMap, 20),
  });

  setImageHashMap(imageHashMap);

  // end task in renderer
  sendToRenderer({
    type: setTask.type,
    payload: {
      isOngoing: false,
    },
  });

  // send image list to renderer
  sendToRenderer({
    type: setImages.type,
    payload: transformImageMaptoImageList(imageHashMap),
  });
};

export default createProject;
