import { configureStore, createSlice } from "@reduxjs/toolkit";
import CONSTANTS from "../constants";

const stateSlice = createSlice({
  name: "uiState",
  initialState: {
    activeRoute: CONSTANTS.ROUTES.START_PAGE,
    // TODONOW: add the rest of the store
  },
  reducers: {
    setActiveRoute: (state, action) => {
      state.activeRoute = action.payload;
      return state;
    },
  },
});

export const { setActiveRoute } = stateSlice.actions;

export default configureStore({ reducer: stateSlice.reducer });
