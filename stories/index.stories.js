const { html } = require("htm/react");
const { Component } = require("react");
const ReactDOM = require("react-dom");
// const styled = require("styled-components");
// require("https://unpkg.com/styled-components/dist/styled-components.min.js");

export default {
  title: "Demo",
};

const styles = {
  color: "#f7df1e",
};

class CounterComponent extends Component {
  // counter = store({ num: 0 });
  increment = () => {
    // this.counter.num++;
    // appStore.appStatus = "TEST";
    console.log("sup");
  };

  render() {
    return html`<button style="${styles}" onClick=${this.increment}>
      hi
    </button>`;
  }
}

export const Counter = () => {
  const container = document.createElement("div");

  ReactDOM.render(html`<${CounterComponent} />`, container);

  return container;
};

const Test = ({ a }) => html`<div>hit: ${a}</div>`;

export const FunctionComponent = () => {
  const container = document.createElement("div");

  ReactDOM.render(html`<${Test} a="test" />`, container);

  return container;
};
