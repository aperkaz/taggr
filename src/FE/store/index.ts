import { configureStore, createSlice } from "@reduxjs/toolkit";

import { ImageType } from "../../shared/entities";
import FE_ROUTES from "../../shared/fe-routes";

interface InitialState {
  activeRoute: keyof typeof FE_ROUTES;
  images: ImageType;
  imagesWithLocation: ImageType[];
  progress: {
    current: number;
    total: number;
  };
}

const initialState: InitialState = {
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
      state.progress = { ...state.progress, ...action.payload };
    },
  },
});

export const ACTIONS = {
  ...stateSlice.actions,
};

const store = configureStore({ reducer: stateSlice.reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
