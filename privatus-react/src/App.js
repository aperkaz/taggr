import React from "react";
import { view } from "@risingstack/react-easy-state";
import StartPage from "./components/StartPage";
import MainPage from "./components/MainPage";
import state, { createStore } from "./store";

createStore();

const App = view(() => (
  <div>
    <h1>{state.appStatus === "START_PAGE" ? <StartPage /> : <MainPage />}</h1>
  </div>
));

export default App;
