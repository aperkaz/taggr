import crypto from "crypto";

/**
 * Generate md5 hash string
 *
 * @param {String} data
 */
function generateMD5Hash(data) {
  return crypto.createHash("md5").update(data).digest("hex");
}

export default generateMD5Hash;
