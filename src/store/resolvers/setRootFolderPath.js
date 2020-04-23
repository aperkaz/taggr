// TODONOW: add tests to resolvers
const setRootFolderPath = (modules, payload) => {
  modules.appStore.rootFolderPath = payload;
};

module.exports = setRootFolderPath;
