const process = require("./process");
const location = require("./location"); // TODONOW: do we need to export this?
const tensor = require("./machineLearning/tensor");
const tags = require("./tags");

module.exports = {
  process: process,
  getLocation: location.getLocation,
  getTensor: tensor.getImageTensor,
  getTags: tags.getTags,
};
