import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './components/App';
import './statics/index.css';

// initialize sentry
import '../shared/sentry';
// Initialize communication handler
import './message-handler';

export default class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
