const FLOWS = require("../flows");
const CreateProject = require("../flows/createProject");
// TODO: clean up
// const deleteProject = require("../flows/deleteProject");

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
  console.log("creating project for ", projectRootFolderPath);

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
  serviceUpdateImages(filterImages(filters));
  serviceUpdateImagesWithLocation(filterImagesWithLocation(filters));
};

module.exports = handlers;
