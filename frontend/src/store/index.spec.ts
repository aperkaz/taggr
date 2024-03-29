import { configureStore } from "@reduxjs/toolkit";
import { types } from "taggr-shared";
import defaultExport, { stateSlice } from "./index";

const ACTIONS = {
  ...stateSlice.actions,
};

describe("redux store", () => {
  let store: typeof defaultExport;

  beforeEach(() => {
    store = configureStore({ reducer: stateSlice.reducer });
  });

  it("should return the initial state", () => {
    const store = configureStore({ reducer: stateSlice.reducer });
    expect(store.getState()).toEqual({
      activeRoute: "START_PAGE",
      images: [],
      imagesWithLocation: [],
      progress: { current: 0, total: 0 },
    });
  });

  it("should set active route", () => {
    store.dispatch(ACTIONS.setActiveRoute("DASHBOARD_PAGE"));
    expect(store.getState().activeRoute).toEqual("DASHBOARD_PAGE");

    store.dispatch(ACTIONS.setActiveRoute("PRE_PROCESSING_PAGE"));
    expect(store.getState().activeRoute).toEqual("PRE_PROCESSING_PAGE");
  });

  it("should set images", () => {
    const IMAGES: types.Image[] = [
      {
        hash: "202d81bad5ecb603d6bda9db46512d56",
        path:
          "file:///Users/alain/Library/Application Support/taggr-nodejs/202d81bad5ecb603d6bda9db46512d56.jpeg",
        rawPath:
          "/Users/alain/temp/pictures/aleksandra-tanasiienko-bV25rEvXBhI-unsplash.jpg",
        tags: ["animals"],
        creationDate: 1616707242202,
        location: null,
      },
    ];
    expect(store.getState().images).toEqual([]);

    store.dispatch(ACTIONS.setImages(IMAGES));
    expect(store.getState().images).toEqual(IMAGES);
  });

  it("should set images with location", () => {
    const IMAGES_WITH_LOCATION: types.ImageWithLocation[] = [
      {
        hash: "202d81bad5ecb603d6bda9db46512d56",
        path:
          "file:///Users/alain/Library/Application Support/taggr-nodejs/202d81bad5ecb603d6bda9db46512d56.jpeg",
        rawPath:
          "/Users/alain/temp/pictures/aleksandra-tanasiienko-bV25rEvXBhI-unsplash.jpg",
        tags: ["animals"],
        creationDate: 1616707242202,
        location: {
          latitude: 1,
          longitude: 2,
        },
      },
    ];
    expect(store.getState().imagesWithLocation).toEqual([]);

    store.dispatch(ACTIONS.setImagesWithLocation(IMAGES_WITH_LOCATION));
    expect(store.getState().imagesWithLocation).toEqual(IMAGES_WITH_LOCATION);
  });

  it("should set progress", () => {
    store.dispatch(
      ACTIONS.setProgress({
        current: 1,
        total: 10,
      })
    );
    expect(store.getState().progress).toEqual({
      current: 1,
      total: 10,
    });

    store.dispatch(
      ACTIONS.setProgress({
        current: 20,
        total: 20,
      })
    );
    expect(store.getState().progress).toEqual({
      current: 20,
      total: 20,
    });
  });

  it("should reset state", () => {
    store.dispatch(ACTIONS.setActiveRoute("DASHBOARD_PAGE"));
    expect(store.getState()).toEqual({
      activeRoute: "DASHBOARD_PAGE",
      images: [],
      imagesWithLocation: [],
      progress: { current: 0, total: 0 },
    });

    store.dispatch(ACTIONS.resetState());
    expect(store.getState()).toEqual({
      activeRoute: "START_PAGE",
      images: [],
      imagesWithLocation: [],
      progress: { current: 0, total: 0 },
    });
  });
});
