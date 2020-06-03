import readdirp from "readdirp";
import trackEventInProd from "../../../shared/trackEventInProd";

/**
 * Recursively find all the image paths inside the folderPath
 *
 * @param {String} folderPath
 * @returns {Promise<String[]>} image paths list
 */
const recursivelyFindImages = async (folderPath) => {
  let imagePathsList = [];
  let projectSize = 0;

  var settings = {
    // Filter files with png and jpeg extension
    fileFilter: ["*.png", "*.PNG", "*.jpg", "*.JPG", "*.jpeg", "*.JPEG"],
    // Filter by directory
    directoryFilter: ["!.git", "!*modules", "!.cache", "!.*"],
    alwaysStat: true,
  };

  for await (const entry of readdirp(folderPath, settings)) {
    const {
      path,
      stats: { size },
    } = entry;
    projectSize += size;
    imagePathsList.push(`${folderPath}/${path}`);
  }

  // TODONOW: extract reporting
  const imageSizeInMb = Math.round(projectSize / 1000000);
  trackEventInProd({
    category: "User Interaction",
    action: "Project created",
    label: "Image count",
    value: imagePathsList.length,
  });

  trackEventInProd({
    category: "User Interaction",
    action: "Project created",
    label: "Size (mb)",
    value: imageSizeInMb,
  });

  return imagePathsList;
};

export default recursivelyFindImages;
