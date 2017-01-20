import { combineReducers } from 'redux';


function app(state = {
}, action) {
  switch (action.type) {

    default:
      return state
  }
}

const reducers = combineReducers({
  app,
});

export default reducers;
