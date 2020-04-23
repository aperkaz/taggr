// TODONOW: add tests to resolvers
const setCurrentPage = (modules, payload) => {
  console.log("resolver, ", payload);
  modules.uiStore.currentPage = payload;
};

module.exports = setCurrentPage;
