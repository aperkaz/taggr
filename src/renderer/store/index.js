import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createProject } from "../services";
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
    // non-reduced actions, for service layer interaction visibility
    triggerCreateProject: (state) => state,
  },
});

export const { setActiveRoute } = stateSlice.actions;

// Actions with side effects (calls to the service layer)
export const serviceCreateProject = (projectRootFolderPath) => {
  store.dispatch(stateSlice.actions.triggerCreateProject());
  createProject(projectRootFolderPath);
};

const store = configureStore({ reducer: stateSlice.reducer });
export default store;
