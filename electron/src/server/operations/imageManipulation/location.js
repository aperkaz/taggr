const get = require("lodash.get");

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
 * @typedef {Object} LatLong
 * @property {number} latitude - The latitude
 * @property {number} longitude - The longitude
 */
/**
 * Get the location info for an image
 * @param {string} imagePath without file:// prefix
 * @returns {Promise<LatLong>}
 */
const getImageLocation = async (imagePath) => {
  try {
    let exifData = await getEXIF(imagePath);

    // check if gps is contained
    const latitude = get(exifData, "gps.GPSLatitude", null);
    const longitude = get(exifData, "gps.GPSLongitude", null);

    if (!latitude || !longitude) return;

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
    // TODO: Sentry: send error.
    // TODO: create backedn wide helper HOF that reports to SENTRY
    // Error reading gps data
    console.log(e);
  }
  return;
};

/**
 * Get the images that have location data from store
 * @param {Object} imageHashMap
 * @returns {string[]} list of image hashes with location data
 */
const getImagesWithLocation = (imageHashMap) => {
  let imagesWithLocation = [];
  Object.keys(imageHashMap).forEach((key) => {
    const image = imageHashMap[key];
    if (image.location && image.location.latitude) {
      imagesWithLocation.push(image);
    }
  });

  return imagesWithLocation;
};

module.exports = {
  getImageLocation,
  getImagesWithLocation,
};
