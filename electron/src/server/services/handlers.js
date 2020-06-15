const { updateImages } = require("./services");
const project = require("../project");

let handlers = {};

handlers["create-project"] = async ({ projectRootFolderPath }) => {
  project.create(projectRootFolderPath);

  // // add flow to list of active flows
  // addFlow(createProjectFlow);

  // // trigger flow
  // await createProjectFlow.process(projectRootFolderPath);

  // // clean active flows
  // deleteFlows();
};

// TODO: rename to destroy-project accross FE & BE
handlers["delete-project"] = async () => {
  project.destroy();

  // stopFlows();
  // resetStore();
};

handlers["filter-images"] = async (filters) => {
  const images = project.filterImages(filters);

  // both {images, imagesWithLocation}
  updateImages(images);

  // serviceUpdateImages(filterImages(filters));
  // serviceUpdateImagesWithLocation(filterImagesWithLocation(filters));
};

module.exports = handlers;
