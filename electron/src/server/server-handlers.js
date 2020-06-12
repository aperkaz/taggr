const FLOWS = require("./flows");

const CreateProject = require("./flows/createProject");
const deleteProject = require("./flows/deleteProject");
const searchImages = require("./flows/searchImages");

const { addFlow, deleteFlows } = require("./store");

const createProject = new CreateProject();

let handlers = {};

handlers["create-project"] = async ({ projectRootFolderPath }) => {
  console.log("creating project for ", projectRootFolderPath);

  // add flow to list of active flows
  addFlow(createProject);

  // trigger flow
  await createProject.process(projectRootFolderPath);

  // clean active flows
  deleteFlows();
};

handlers["delete-project"] = () => {
  console.log("delete project!");
};

handlers["filter-images"] = async ({ filter }) => {
  console.log("filtering images: ", filter);

  // return images, imagesWithLocation;
};

module.exports = handlers;
