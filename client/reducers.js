import { combineReducers } from 'redux';

import products from './reducers/products.reducers.js';

function app(state = {
}, action) {
  switch (action.type) {

    default:
      return state
  }
}

const reducers = combineReducers({
  app,
  products
});

export default reducers;
