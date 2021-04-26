import { configureStore, createSlice } from "@reduxjs/toolkit";
import FE_ROUTES from "../../shared/fe-routes";

const initialState = {
  activeRoute: FE_ROUTES.START_PAGE,
  images: null,
  imagesWithLocation: null,
  progress: {
    current: 0,
    total: 0,
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
    setProgress: (state, action) => {
      state.progress = { ...state.task, ...action.payload };
    },
  },
});

export const ACTIONS = {
  ...stateSlice.actions,
};

const store = configureStore({ reducer: stateSlice.reducer });
export default store;
