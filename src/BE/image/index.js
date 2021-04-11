const bytenode = require("bytenode");
const process = require("./process");
const location = require("./location");
const tensor = require("./machineLearning/tensor");
const tags = require("./tags");

module.exports = {
  process: process,
  getLocation: location.getLocation,
  getTensor: tensor.getImageTensor,
  getTags: tags.getTags,
};
