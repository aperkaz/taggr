const { remote } = require("electron");
const { observe } = require("@nx-js/observer-util");
const { view, store } = require("@risingstack/react-easy-state");

const StartPage = require("./components/StartPage");
const DashboardPage = require("./components/DashboardPage");
const createStore = require("./store");

// itialize store
let appStore = createStore();

// initialize UI components
const StartPageComponent = new StartPage(store);
const DashboardPageComponent = new DashboardPage(store);

// reactive routing
observe(() => {
  switch (store.appStatus) {
    case "START_PAGE":
      DashboardPageComponent.unmount();
      StartPageComponent.mount();
      break;
    case "DASHBOARD_PAGE":
      StartPageComponent.unmount();
      DashboardPageComponent.mount();
      break;
    default:
  }
});

// Test react
const ReactDOM = require("react-dom");
const { Component } = require("react");
// import htm from 'https://unpkg.com/htm?module'
const { html } = require("htm/react");

class AppComponent extends Component {
  render() {
    return html`<div>${appStore.appStatus} <${Counter} /></div>`;
  }
}

const App = view(AppComponent);

// styles
const styles = {
  color: "#f7df1e",
};

class CounterComponent extends Component {
  counter = store({ num: 0 });
  increment = () => {
    this.counter.num++;
    appStore.appStatus = "TEST";
  };

  render() {
    return html`<button style="${styles}" onClick=${this.increment}>
      switch state ${this.counter.num}
    </button>`;
  }
}

const Counter = view(CounterComponent);

// ReactDOM.render(Compo.render(), document.getElementById("root"));
ReactDOM.render(html`<${App} page="All" />`, document.getElementById("root"));

// test preact
// const {
//   html,
//   Component,
//   render,
// } = require("https://unpkg.com/htm/preact/standalone.module.js");

// class App extends Component {
//   addTodo() {
//     const { todos = [] } = this.state;
//     this.setState({ todos: todos.concat(`Item ${todos.length}`) });
//   }
//   render({ page }, { todos = [] }) {
//     return html`
//       <div class="app">
//         <${Header} name="ToDo's (${page})" />
//         <ul>
//           ${todos.map((todo) => html` <li>${todo}</li> `)}
//         </ul>
//         <button onClick=${() => this.addTodo()}>Add Todo</button>
//         <${Footer}>footer content here<//>
//       </div>
//     `;
//   }
// }

// const Header = ({ name }) => html`<h1>${name} List</h1>`;

// const Footer = (props) => html`<footer ...${props} />`;

// render(html`<${App} page="All" />`, document.body);
