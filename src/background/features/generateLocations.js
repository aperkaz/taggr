import get from "lodash.get";
import { sendToRendererThrottled } from "../services/utils";
import { getStopFlow } from "../store";

import { setTask } from "../../renderer/store";

/**
 * Generate the location info for all the images in the imageHashMap
 * @param {Object} sourceImageHashMap
 */
const generateLocations = async (sourceImageHashMap) => {
  if (getStopFlow()) return;

  const fs = require("fs");
  const util = require("util");
  const readFile = util.promisify(fs.readFile);

  const imageHashMap = { ...sourceImageHashMap };

  const imageHasesToProcess = getImagesWithoutLocation(imageHashMap);

  const totalImagesToGeolocate = imageHasesToProcess.length;
  let imagesLocated = 0;

  while (imageHasesToProcess.length > 0) {
    if (getStopFlow()) return;

    imagesLocated++;

    sendToRendererThrottled({
      type: setTask.type,
      payload: {
        percentage: Math.floor((imagesLocated * 100) / totalImagesToGeolocate),
      },
    });

    const hash = imageHasesToProcess.pop();
    const normalize = require("normalize-path");
    const imagePath = normalize(imageHashMap[hash].rawPath);

    let exifData = await getEXIF(imagePath);

    // check if gps is contained
    const latitude = get(exifData, "gps.GPSLatitude", null);
    const longitude = get(exifData, "gps.GPSLongitude", null);

    if (!latitude || !longitude) continue;

    const latDMS = exifData.gps.GPSLatitude;
    const longDMS = exifData.gps.GPSLongitude;

    const geoString = `${get(exifData, "gps.GPSLatitudeRef", "")}${
      latDMS[0]
    }° ${latDMS[1]}' ${latDMS[2]}" ${get(exifData, "gps.GPSLongitudeRef", "")}${
      longDMS[0]
    }° ${longDMS[1]}' ${longDMS[2]}"`;

    console.log(geoString);

    const { lat, lon } = toDecimal(geoString);

    // console.log("lat: ", lat);
    // console.log("lon: ", lon);

    imageHashMap[hash] = {
      ...imageHashMap[hash],
      location: location ? { lat, long: lon } : {},
    };

    exifData = null;
  }

  return imageHashMap;
};

const toDecimal = (latLongString) => {
  var parseDMS = require("parse-dms");

  return parseDMS(latLongString);
};

const getEXIF = (filePath) => {
  var ExifImage = require("exif").ExifImage;

  return new Promise((resolve) => {
    new ExifImage(filePath, (err, data) => {
      resolve(data);
    });
  });
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

/**
 * Get the images that have latitude
 * @param {Object} imageHashMap
 * @returns {string[]} list of image hashes without tags
 */
export const getImagesWihLocation = (imageHashMap) => {
  let imagesWithLocation = [];
  Object.keys(imageHashMap).forEach((key) => {
    const image = imageHashMap[key];
    if (image.location && image.location.lat) {
      imagesWithLocation.push(image);
    }
  });

  return imagesWithLocation;
};

export default generateLocations;
