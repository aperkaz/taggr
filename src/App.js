import React from "react";
import { view } from "@risingstack/react-easy-state";
import StartPage from "./components/StartPage.js";
import MainPage from "./components/MainPage.js";
import state, { createStore } from "./store";
import "./index.css";

createStore();

const App = view(() => (
  <div>
    <h1>{state.appStatus === "START_PAGE" ? <StartPage /> : <MainPage />}</h1>
  </div>
));

export default App;
