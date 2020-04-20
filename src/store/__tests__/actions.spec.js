const { expect } = require("chai");
const { processor, ACTIONS } = require("../actions");

describe("actions.js", () => {
  describe("Test action processing", () => {
    let uiStore, appStore;

    beforeEach(() => {
      uiStore = {
        currentPage: "",
        tagSearchValue: "",
        filteredImageList: [],
      };

      appStore = {
        rootFolderPath: null,
        imageHashMap: {},
      };
    });

    it("SET_CURRENT_PAGE", () => {
      const newPage = "TEST_PAGE";
      const action = {
        type: ACTIONS.SET_CURRENT_PAGE,
        payload: newPage,
      };
      processor(action, uiStore, appStore);
      expect(uiStore.currentPage).to.equal(newPage);
    });

    it("SET_ROOT_FOLDER_PATH", () => {
      const rootFolderPath = "ROOT_FOLDER_PATH";
      const action = {
        type: ACTIONS.SET_ROOT_FOLDER_PATH,
        payload: rootFolderPath,
      };
      processor(action, uiStore, appStore);
      expect(appStore.rootFolderPath).to.equal(rootFolderPath);
    });

    it.skip("CALCULATE_IMAGE_PATHS_IN_ROOT", () => {
      expect(true).to.equal("test helper functions");
    });

    it.skip("CALCULATE_IMAGE_TAGS", () => {
      expect(true).to.equal("test helper functions");
    });

    it("SET_IMAGE_PATHS_IN_MAP, payload: empty list", async () => {
      const action = {
        type: ACTIONS.SET_IMAGE_PATHS_IN_MAP,
        payload: [],
      };
      processor(action, uiStore, appStore);
      expect(appStore.imageHashMap).to.deep.equal({});
    });
    it("SET_IMAGE_PATHS_IN_MAP, payload: with full list", async () => {
      const action = {
        type: ACTIONS.SET_IMAGE_PATHS_IN_MAP,
        payload: ["path/1", "path/2"],
      };
      processor(action, uiStore, appStore);

      expect(appStore.imageHashMap).to.deep.equal({
        "0335ced06ef24a0a8ca8c0b2eb1e0ee2": {
          hash: "0335ced06ef24a0a8ca8c0b2eb1e0ee2",
          path: "path/1",
          tags: null,
        },
        "13f345979fdcc05f67278da65c2cbe5c": {
          hash: "13f345979fdcc05f67278da65c2cbe5c",
          path: "path/2",
          tags: null,
        },
      });
    });

    it("SET_IMAGE_TAGS_IN_MAP, payload: empty list", async () => {
      appStore.imageHashMap = { hash1: { tags: null } };

      const action = {
        type: ACTIONS.SET_IMAGE_TAGS_IN_MAP,
        payload: { imageHash: "hash1", tags: [] },
      };
      processor(action, uiStore, appStore);

      expect(appStore.imageHashMap).to.deep.equal({ hash1: { tags: [] } });
    });
    it("SET_IMAGE_TAGS_IN_MAP, payload: with full list", async () => {
      const imageHash = "hash1";
      const tags = ["dog", "cat"];

      appStore.imageHashMap[imageHash] = {};

      const action = {
        type: ACTIONS.SET_IMAGE_TAGS_IN_MAP,
        payload: { imageHash, tags },
      };
      processor(action, uiStore, appStore);

      expect(appStore.imageHashMap[imageHash].tags).to.equal(tags);
    });

    // partial match for image tag strings
    it("SET_IMAGE_FILTER_TAG_SEARCH_VALUE", () => {
      const searchValue = "cat";

      appStore.imageHashMap = {
        hash1: { path: "path/1", tags: ["dog"] },
        hash2: { path: "path/2", tags: ["cats"] },
        hash3: { path: "path/3", tags: ["dog", "cat"] },
      };

      const action = {
        type: ACTIONS.SET_IMAGE_FILTER_TAG_SEARCH_VALUE,
        payload: searchValue,
      };
      processor(action, uiStore, appStore);

      expect(uiStore.tagSearchValue).to.equal("cat");
      expect(uiStore.filteredImageList.length).to.equal(2);
    });
  });
});
