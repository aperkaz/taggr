import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

import App from "./components/App";
import "./statics/index.css";

import Image from "../shared/Image";

console.log(Image.print());
console.log(Image.print());

// IPC
const bc = new BroadcastChannel("test_channel");

bc.postMessage("This is FE.");
bc.onmessage = function (ev) {
  console.log("FE: ", ev);
};

export default class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
