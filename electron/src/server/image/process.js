const bytenode = require("bytenode");
const filesystem = require("../filesystem");
const { getTags } = require("./tags");
const { getLocation } = require("./location");

/**
 * Extract all the information form an image
 *
 * @param {string} path
 */
const process = async (path) => {
  console.log("processing image: ", path);

  const tags = await getTags(path);
  console.log("tags: ", tags);
  const location = await getLocation(path);
  console.log("location: ", JSON.stringify(location));

  const creationDate = await filesystem.getFileCreationDate(path);

  const imageData = {
    location,
    tags,
    creationDate,
    // isSexy: await isImageSexy(smallImageData),
  };

  return imageData;
};

module.exports = process;
