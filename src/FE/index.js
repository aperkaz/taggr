import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

import App from "./components/App";

import Loading from "./Loading";

export default class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Loading />
      </Provider>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
