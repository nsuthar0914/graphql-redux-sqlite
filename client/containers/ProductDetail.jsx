import React from 'react';
import { connect } from 'react-redux';
import {getProduct} from '../actions/products.actions.js';
import {Link} from 'react-router';

class ProductDetail extends React.Component {
  componentWillMount() {
    const {getProduct, params} = this.props;
    getProduct(`{product(id:"${params.id}"){id, name, description, quantity, cost, image}}`)
  }
  render() {
    const {product, fetching} = this.props;
    return (
      <div style={{textAlign: "center"}}>
        <Link style={{float: "right"}} to="/products">Home</Link>
        <h1>{product.get("name")}</h1>
        <img height="400" width="400" src={product.get("image")} />
        <p>{product.get("description")}</p>
        <b>Cost</b>: {product.get("cost")}
        <br />
        <b>Quantity</b>: {product.get("quantity")}
        <br />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.products.get("product"),
    fetching: state.products.get("fetching"),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (payload) => {
      return dispatch(getProduct(payload));
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail);