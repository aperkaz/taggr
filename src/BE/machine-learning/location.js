const bytenode = require("bytenode");
const get = require("lodash.get");
const { loadEXIFData } = require("../filesystem");

/**
 * Get the location info for an image
 * @param {string} imagePath without file:// prefix
 * @returns {Promise<{latitude: number, longitude: number}>}
 */
const getLocation = async function (imagePath) {
  try {
    let exifData = await loadEXIFData(imagePath);

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
 * @param {string} latLongString
 */
const toDecimal = (latLongString) => {
  var parseDMS = require("parse-dms");

  return parseDMS(latLongString);
};

module.exports = { getLocation };
