import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createProject } from "../services";
import CONSTANTS from "./constants";

const initialState = {
  activeRoute: CONSTANTS.ROUTES.START_PAGE,
  images: [],
  tags: [],
  task: {
    isOngoing: false,
    name: "",
    percentage: 0,
  },
};

const stateSlice = createSlice({
  name: "uiState",
  initialState,
  reducers: {
    resetState: () => initialState,
    setActiveRoute: (state, action) => {
      state.activeRoute = action.payload;
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setTask: (state, action) => {
      state.task = { ...state.task, ...action.payload };
    },
    setTags: (state, action) => {
      state.tags = action.payload;
    },

    // non-reduced actions, for service layer interaction visibility
    triggerCreateProject: (state) => state,
  },
});

export const {
  resetState,
  setActiveRoute,
  setImages,
  setTask,
  setTags,
} = stateSlice.actions;

// Actions with side effects (calls to the service layer)
export const serviceCreateProject = (projectRootFolderPath) => {
  store.dispatch(stateSlice.actions.triggerCreateProject());
  createProject(projectRootFolderPath);
};

const store = configureStore({ reducer: stateSlice.reducer });
export default store;
