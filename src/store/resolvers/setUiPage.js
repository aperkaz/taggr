// TODONOW: add tests to resolvers
const setUiPage = (modules, payload) => {
  modules.uiStore.currentPage = payload;
};

module.exports = setUiPage;
