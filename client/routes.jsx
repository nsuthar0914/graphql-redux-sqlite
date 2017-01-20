import React from 'react';
import { Route, IndexRedirect, IndexRoute  } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'  ;

import App from './containers/App.jsx';
import ProductList from './containers/ProductList.jsx';
import ProductDetail from './containers/ProductDetail.jsx';
import AddEditProduct from './containers/AddEditProduct.jsx';

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
      <Route path="product/new" component={AddEditProduct}/>
      <Route path="product/:id" component={ProductDetail}/>
      <Route path="product/:id/edit" component={AddEditProduct}/>
    </Route>
  )
}