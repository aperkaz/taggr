import { setImages, setTask, setTags } from "../../renderer/store";
import { sendToRenderer } from "../services/utils";
import recursivelyFindImages from "../features/recursivelyFindImages";
import generateImageHashMap from "../features/generateImageHashMap";
import generateTags from "../features/generateTags";
import generateLocations from "../features/generateLocations";
import transformImageMaptoImageList from "../features/transformImageMaptoImageList";
import getTopTags from "../features/getTopTags";

import store from "../store";

const createProject = async (projectRootFolderPath) => {
  // open task in renderer
  sendToRenderer({
    type: setTask.type,
    payload: {
      isOngoing: true,
      name: "Be patient, the robots are analysing your memories!",
      percentage: 0,
    },
  });

  store.projectRootFolderPath = projectRootFolderPath;

  let imagePathsToProcess = await recursivelyFindImages(projectRootFolderPath);

  store.imageHashMap = generateImageHashMap(imagePathsToProcess);

  // send image list to renderer
  sendToRenderer({
    type: setImages.type,
    payload: transformImageMaptoImageList(store.imageHashMap),
  });

  console.log(store.imageHashMap);

  // compute gps position for all images
  console.time("generateAllLocations");
  // TODONOW: fix. read only jpeg files
  // store.imageHashMap = await generateLocations(store.imageHashMap);
  console.timeEnd("generateAllLocations");
  // console.log(store.imageHashMap);

  // compute tags for all images
  store.imageHashMap = await generateTags(store.imageHashMap);

  console.log(store.imageHashMap);

  // calculate top 20 tags, send to renderer
  sendToRenderer({
    type: setTags.type,
    payload: await getTopTags(store.imageHashMap, 20),
  });

  // end task in renderer
  sendToRenderer({
    type: setTask.type,
    payload: {
      isOngoing: false,
    },
  });
};

export default createProject;
