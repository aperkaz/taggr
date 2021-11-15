import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { types } from "taggr-shared";

type InitialState = {
  activeRoute: types.FrontendRoutes;
  images: types.Image[];
  imagesWithLocation: types.ImageWithLocation[];
  progress: types.Progress;
  isProcessing: boolean;
};

const initialState: InitialState = {
  activeRoute: "START_PAGE",
  images: [],
  imagesWithLocation: [],
  isProcessing: true,
  progress: {
    current: 0,
    total: 0,
  },
};

export const stateSlice = createSlice({
  name: "uiState",
  initialState,
  reducers: {
    resetState: () => initialState,
    setActiveRoute: (state, action: PayloadAction<types.FrontendRoutes>) => {
      state.activeRoute = action.payload;
    },
    setImages: (state, action: PayloadAction<types.Image[]>) => {
      state.images = action.payload;
    },
    setImagesWithLocation: (
      state,
      action: PayloadAction<types.ImageWithLocation[]>
    ) => {
      state.imagesWithLocation = action.payload;
    },
    setIsProcessing: (state, action: PayloadAction<boolean>) => {
      state.isProcessing = action.payload;
    },
    setProgress: (state, action: PayloadAction<types.Progress>) => {
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
