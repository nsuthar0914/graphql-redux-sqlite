import React from 'react';
import { connect } from 'react-redux';
import {getProducts, removeProduct} from '../actions/products.actions.js';
import {Link, browserHistory} from 'react-router';

class ProductList extends React.Component {
  componentWillMount() {
    const {getProducts} = this.props;
    getProducts("{products{id, name, creator{id}}}")
  }
  render() {
    const {products, fetching, removeProduct, user} = this.props;
    return (
      <div style={{textAlign:"center"}}>
        <h1>List of Products</h1>
        {products && products.map(product => {
          console.log(product)
          return (
            <div style={{width: "300px", margin: "0 auto"}} key={product.id}>
              <div style={{width: "150px", display:"inline-block", textAlign: "left"}}>
                <Link to={`product/${product.id}`}>
                  {product.name}
                </Link>
              </div>
              <div style={{width: "150px", display:"inline-block", textAlign: "right"}}>
                <button disabled={!product.creator || product.creator.id != user.get("id")} onClick={() => browserHistory.push(`/product/${product.id}/edit`)}>
                  Edit
                </button>
                &nbsp;
                &nbsp;
                <button disabled={!product.creator || product.creator.id != user.get("id")} onClick={() => removeProduct(`mutation{removeProduct(id:"${product.id}"){id, name}}`)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        <br />
        {user && user.get("email")
          ? <Link to="product/new">
            Add New Product
          </Link>
          : <Link to="login">
            Login to start adding products
          </Link>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.get("products"),
    fetching: state.products.get("fetching"),
    user: state.login.get("user")
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