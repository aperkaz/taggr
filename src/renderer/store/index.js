import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createProject } from "../services";
import CONSTANTS from "./constants";

const stateSlice = createSlice({
  name: "uiState",
  initialState: {
    activeRoute: CONSTANTS.ROUTES.START_PAGE,
    images: [],
    imageFilter: {},
    tagList: {},
  },
  reducers: {
    setActiveRoute: (state, action) => {
      state.activeRoute = action.payload;
      return state;
    },
    setImages: (state, action) => {
      state.images = action.payload;
      return state;
    },
    // non-reduced actions, for service layer interaction visibility
    triggerCreateProject: (state) => state,
  },
});

export const { setActiveRoute, setImages } = stateSlice.actions;

// Actions with side effects (calls to the service layer)
export const serviceCreateProject = (projectRootFolderPath) => {
  store.dispatch(stateSlice.actions.triggerCreateProject());
  createProject(projectRootFolderPath);
};

const store = configureStore({ reducer: stateSlice.reducer });
export default store;
