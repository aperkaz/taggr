const bytenode = require("bytenode");

const services = require("./services");
const project = require("../entities/Project");
const { BE_EVENTS } = require("../../../../frontend/src/IPC_EVENTS");

let handlers = {};

handlers[BE_EVENTS.CREATE_PROJECT] = async function ({
  projectRootFolderPath,
}) {
  project.create(projectRootFolderPath);
};

handlers[BE_EVENTS.DELETE_PROJECT] = async function () {
  project.destroy();
};

handlers[BE_EVENTS.FILTER_IMAGES] = async function (filters) {
  const images = project.filterImages(filters);
  services.updateImages(images);
};

module.exports = handlers;
