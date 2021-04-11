import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

import App from "./components/App";
import "./statics/index.css";

// Initialize communication handler
import messageHandler from "./message-handler";
messageHandler.postMessage({ type: "test", payload: "Hola FE" });

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
