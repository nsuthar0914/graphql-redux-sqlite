import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
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
  products,
  form: formReducer
});

export default reducers;
