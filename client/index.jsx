import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';

import routes from './routes.jsx';
import reducers from './reducers.js';
const logger = createLogger({collapsed: true});
let createStoreWithMiddleware = applyMiddleware(reduxThunk, logger/*, api*/)(createStore);
let store = createStoreWithMiddleware(reducers);



ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory} routes={routes(store)}></Router>
  </Provider>
  ), document.getElementById('app')
);
