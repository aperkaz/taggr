import { configureStore, createSlice } from "@reduxjs/toolkit";
import CONSTANTS from "./constants";

const initialState = {
  activeRoute: CONSTANTS.ROUTES.START_PAGE,
  images: null,
  imagesWithLocation: [],
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
  },
});

export const ACTIONS = {
  ...stateSlice.actions,
};

const store = configureStore({ reducer: stateSlice.reducer });
export default store;
