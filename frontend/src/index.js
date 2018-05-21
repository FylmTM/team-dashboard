import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import '@blueprintjs/core/lib/css/blueprint.css';

import App from './components/App';
import fetchAndPollData from './util/data';
import './index.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

fetchAndPollData(store);
