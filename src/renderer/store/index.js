import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createProject, deleteProject, searchImages } from "../services";
import CONSTANTS from "./constants";

const initialState = {
  activeRoute: CONSTANTS.ROUTES.START_PAGE,
  images: [],
  imagesWithLocation: [],
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
    setImagesWithLocation: (state, action) => {
      state.imagesWithLocation = action.payload;
    },
    setTask: (state, action) => {
      state.task = { ...state.task, ...action.payload };
    },
    setTags: (state, action) => {
      state.tags = action.payload;
    },
  },
});

export const {
  resetState,
  setActiveRoute,
  setImages,
  setImagesWithLocation,
  setTask,
  setTags,
} = stateSlice.actions;

// Actions with side effects (incl. calls to the service layer). The backend will trigger the actions.
export const serviceCreateProject = (projectRootFolderPath) => {
  createProject(projectRootFolderPath);
};

export const serviceDeleteProject = () => {
  deleteProject();
};

export const serviceSearchImages = (tagValue) => {
  searchImages(tagValue);
};

const store = configureStore({ reducer: stateSlice.reducer });
export default store;
