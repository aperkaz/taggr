const bytenode = require("bytenode");

const services = require("./services");
const project = require("../project");

let handlers = {};

handlers["create-project"] = async ({ projectRootFolderPath }) => {
  project.create(projectRootFolderPath);
};

// TODO: rename to destroy-project accross FE & BE
handlers["delete-project"] = async () => {
  project.destroy();
};

handlers["filter-images"] = async (filters) => {
  const images = await project.filterImages(filters);
  services.updateImages(images);
};

module.exports = handlers;
