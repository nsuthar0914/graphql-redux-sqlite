import React from 'react';
import { Route, IndexRedirect, IndexRoute  } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'  ;

import App from './containers/App.jsx';
import ProductList from './containers/ProductList.jsx';

export default function (store) {
  function requireAuth(nextState, replace) {
    if (!store.getState().login.isAuthenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }
  return (
    <Route path="/" component={App}>
      <IndexRedirect to="products"/>
      <Route path="products" component={ProductList}/>
    </Route>
  )
}