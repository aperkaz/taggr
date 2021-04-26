import get from "lodash.get";

import { LocationType } from "../../shared/entities";

const ExifImage = require("exif").ExifImage;

/**
 * Load EXIF data from path.
 */
const loadEXIFData = (path: string) => {
  return new Promise((resolve) => {
    new ExifImage(path, (err: any, data: any) => {
      console.log(err);
      console.log(data);
      resolve(data);
    });
  });
};

/**
 * Get the location info for an image
 */
const getImageLocation = async function (
  imagePath: string
): Promise<LocationType> {
  try {
    let exifData: any = await loadEXIFData(imagePath);

    // check if gps is contained
    const latitude = get(exifData, "gps.GPSLatitude", null);
    const longitude = get(exifData, "gps.GPSLongitude", null);

    if (!latitude || !longitude) return { latitude: null, longitude: null };

    const latDMS = exifData.gps.GPSLatitude;
    const longDMS = exifData.gps.GPSLongitude;

    const geoString = `${get(exifData, "gps.GPSLatitudeRef", "")}${
      latDMS[0]
    }° ${latDMS[1]}' ${latDMS[2]}" ${get(exifData, "gps.GPSLongitudeRef", "")}${
      longDMS[0]
    }° ${longDMS[1]}' ${longDMS[2]}"`;

    const { lat, lon } = toDecimal(geoString);

    return { latitude: lat, longitude: lon };
  } catch (e) {
    // TODO: TODONOW: send error.
    // TODO: create backedn wide helper HOF that reports to SENTRY
    // Error reading gps data
    console.log(e);
  }

  return { latitude: null, longitude: null };
};

/**
 * Translate latlong string to {lat, lon} object
 */
const toDecimal = (latLongString: string) => {
  var parseDMS = require("parse-dms");

  return parseDMS(latLongString);
};

export default getImageLocation;
