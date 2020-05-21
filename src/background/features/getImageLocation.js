import get from "lodash.get";

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
 * Get the location info for an image
 * @param {string} imagePath
 */
const getLocation = async (imagePath) => {
  let exifData = await getEXIF(imagePath);

  console.log(exifData);

  // check if gps is contained
  const latitude = get(exifData, "gps.GPSLatitude", null);
  const longitude = get(exifData, "gps.GPSLongitude", null);

  if (!latitude || !longitude) return;

  const latDMS = exifData.gps.GPSLatitude;
  const longDMS = exifData.gps.GPSLongitude;

  const geoString = `${get(exifData, "gps.GPSLatitudeRef", "")}${latDMS[0]}° ${
    latDMS[1]
  }' ${latDMS[2]}" ${get(exifData, "gps.GPSLongitudeRef", "")}${longDMS[0]}° ${
    longDMS[1]
  }' ${longDMS[2]}"`;

  console.log(geoString);

  const { lat, lon } = toDecimal(geoString);

  return { latitude: lat, longitude: lon };
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
    if (image.location && image.location.latitude) {
      imagesWithLocation.push(image);
    }
  });

  return imagesWithLocation;
};

export default getLocation;
