const bytenode = require("bytenode");
const load = require("./load");
const operation = require("./operation");
const urls = require("./urls");

module.exports = {
  loadFileAsUint8Array: load.loadFileAsUint8Array,
  loadEXIFData: load.loadEXIFData,
  loadFilesystemStats: load.loadFilesystemStats,
  getFileCreationDate: operation.getFileCreationDate,
  normalizeUrl: urls.normalizeUrl,
};
