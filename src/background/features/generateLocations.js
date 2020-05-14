import piexif from "piexifjs";
import isImageOfType from "./isImageOfType";
import { sendToRendererThrottled } from "../services/utils";
import { setTask } from "../../renderer/store";
// import fs from "fs";

/**
 * Generate the location info for all the images in the imageHashMap
 * @param {Object} sourceImageHashMap
 */
const generateLocations = async (sourceImageHashMap) => {
  const fs = require("fs");
  const util = require("util");
  const readFile = util.promisify(fs.readFile);

  const imageHashMap = { ...sourceImageHashMap };

  const imageHasesToProcess = getImagesWithoutLocation(imageHashMap);

  const totalImagesToGeolocate = imageHasesToProcess.length;
  let imagesLocated = 0;

  while (imageHasesToProcess.length > 0) {
    imagesLocated++;

    sendToRendererThrottled({
      type: setTask.type,
      payload: {
        percentage: Math.floor((imagesLocated * 100) / totalImagesToGeolocate),
      },
    });

    const hash = imageHasesToProcess.pop();
    const imagePath = imageHashMap[hash].rawPath;

    // read only JPEG files, not the rest!
    if (
      !(isImageOfType(imagePath, "jpeg") || isImageOfType(imagePath, "jpg"))
    ) {
      continue;
    }

    console.log(`Analyzing: ${imagePath}`);

    let jpeg = await readFile(imageHashMap[hash].rawPath);
    let data = jpeg.toString("binary");

    const location = hasLatLong(data) ? getLatLong(data) : {};

    if (Object.keys(location).length > 0) {
      console.log("geolocation found!: ", imagePath);
    }

    imageHashMap[hash] = {
      ...imageHashMap[hash],
      location: location ? location : {},
    };
  }

  return imageHashMap;
};

const hasLatLong = (data) => {
  let exifObj = piexif.load(data);

  // if there is exif GPS object
  if (Object.keys(exifObj["GPS"]).length) {
    // if the exif GPS object has lat/long
    if (
      exifObj.GPS[piexif.GPSIFD.GPSLatitude] &&
      exifObj.GPS[piexif.GPSIFD.GPSLatitude].length &&
      exifObj.GPS[piexif.GPSIFD.GPSLongitude] &&
      exifObj.GPS[piexif.GPSIFD.GPSLongitude].length
    ) {
      return true;
    }
  }

  return false;
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
 * Returns the JEPG, images hashes of the images that dont have location
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
