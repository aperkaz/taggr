import crypto from "crypto";

/**
 * Generate md5 hash string
 *
 * @param {String} input
 */
export function generateMD5Hash(input) {
  return crypto.createHash("md5").update(input).digest("hex");
}
