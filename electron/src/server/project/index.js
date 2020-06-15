let project = require("./project");
let filter = require("./filter");

module.exports = {
  create: project.create,
  destroy: project.destroy,
  filterImages: filter.filterImages,
};
