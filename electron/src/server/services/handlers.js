const FLOWS = require("../flows");
const CreateProject = require("../flows/createProject");
const deleteProject = require("../flows/deleteProject");
const searchImages = require("../flows/searchImages");

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

handlers["filter-images"] = async ({ filter }) => {
  console.log("filtering images: ", filter);

  // return images, imagesWithLocation;
};

module.exports = handlers;
