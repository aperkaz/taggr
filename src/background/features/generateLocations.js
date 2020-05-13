import piexif from "piexifjs";
// import fs from "fs";

/**
 * Generate the location info for all the images in the imageHashMap
 * @param {Object} sourceImageHashMap
 */
const generateLocations = async (sourceImageHashMap) => {
  const fs = require("fs");
  const util = require("util");

  const readFile = util.promisify(fs.readFile);

  const imageHashMap = {};

  const imageHasesToProcess = getImagesWithoutLocation(sourceImageHashMap);

  while (imageHasesToProcess.length > 0) {
    let hash = imageHasesToProcess.pop();

    // TODONOW: read only JPEG files, not the rest!

    let jpeg = await readFile(sourceImageHashMap[hash].rawPath);

    // console.timeEnd("readFile");

    // console.time("toString");
    let data = jpeg.toString("binary");
    // console.timeEnd("toString");

    // console.time("getLocation");
    const location = hasLatLong(data) ? getLatLong(data) : {};
    // console.timeEnd("getLocation");

    imageHashMap[hash] = {
      ...sourceImageHashMap[hash],
      location: location ? location : {},
    };
  }

  return imageHashMap;
};

const hasLatLong = (data) => {
  let exifObj = piexif.load(data);

  return Object.keys(exifObj["GPS"]).length;
};

const getLatLong = (data) => {
  let exifObj = piexif.load(data);

  // read latitude
  const lat = piexif.GPSHelper.dmsRationalToDeg(
    exifObj["GPS"][piexif.GPSIFD.GPSLatitude],
    exifObj["GPS"][piexif.GPSIFD.GPSLatitudeRef]
  );

  // read longitude
  const long = piexif.GPSHelper.dmsRationalToDeg(
    exifObj["GPS"][piexif.GPSIFD.GPSLongitude],
    exifObj["GPS"][piexif.GPSIFD.GPSLongitudeRef]
  );

  return { lat, long };
};

/**
 * Returns the images hashes of the images that dont have location
 * @param {Object} imageHashMap
 * @returns {string[]} list of image hashes without tags
 */
const getImagesWithoutLocation = (imageHashMap) => {
  let imageHashListToProcess = [];
  Object.keys(imageHashMap).forEach((key) => {
    const image = imageHashMap[key];
    if (image.location === null) {
      imageHashListToProcess.push(key);
    }
  });

  return imageHashListToProcess;
};

export default generateLocations;
