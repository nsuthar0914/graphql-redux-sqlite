import React from 'react';
import { connect } from 'react-redux';
import {getProducts, removeProduct} from '../actions/products.actions.js';
import {Link, browserHistory} from 'react-router';

class ProductList extends React.Component {
  componentWillMount() {
    const {getProducts} = this.props;
    getProducts("{products{id, name}}")
  }
  render() {
    const {products, fetching, removeProduct} = this.props;
    return (
      <div style={{textAlign:"center"}}>
        <Link style={{float: "right"}} to="/login">Login</Link>
        <h1>List of Products</h1>
        {products && products.map(product => {
          return (
            <div style={{width: "300px", margin: "0 auto"}} key={product.id}>
              <div style={{width: "150px", display:"inline-block", textAlign: "left"}}>
                <Link to={`product/${product.id}`}>
                  {product.name}
                </Link>
              </div>
              <div style={{width: "150px", display:"inline-block", textAlign: "right"}}>
                <button onClick={() => browserHistory.push(`/product/${product.id}/edit`)}>
                  Edit
                </button>
                &nbsp;
                &nbsp;
                <button onClick={() => removeProduct(`mutation{removeProduct(id:"${product.id}"){id, name}}`)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        <br />
        <Link to="product/new">
          Add New Product
        </Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.get("products"),
    fetching: state.products.get("fetching"),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (payload) => {
      return dispatch(getProducts(payload));
    },
    removeProduct: (payload) => {
      return dispatch(removeProduct(payload));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);