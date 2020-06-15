const CreateProject = require("../flows/createProject");
const {
  filterImages,
  filterImagesWithLocation,
} = require("../flows/filterImages");

const {
  serviceUpdateImages,
  serviceUpdateImagesWithLocation,
} = require("../services");

const { addFlow, deleteFlows, stopFlows, resetStore } = require("../store");

const createProjectFlow = new CreateProject();

let handlers = {};

handlers["create-project"] = async ({ projectRootFolderPath }) => {
  // add flow to list of active flows
  addFlow(createProjectFlow);

  // trigger flow
  await createProjectFlow.process(projectRootFolderPath);

  // clean active flows
  deleteFlows();
};

handlers["delete-project"] = async () => {
  console.log("delete project!");

  stopFlows();
  resetStore();
};

handlers["filter-images"] = async (filters) => {
  // TODO: improvement use only a updateImage service, not 2
  serviceUpdateImages(filterImages(filters));
  serviceUpdateImagesWithLocation(filterImagesWithLocation(filters));
};

module.exports = handlers;
