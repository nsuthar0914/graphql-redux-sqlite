import React from 'react';
import { connect } from 'react-redux';
import {getProducts, removeProduct} from '../actions/products.actions.js';
import {Link} from 'react-router';

class ProductList extends React.Component {
  componentWillMount() {
    const {getProducts} = this.props;
    getProducts("{products{id, name}}")
  }
  render() {
    const {products, fetching, removeProduct} = this.props;
    return (
      <div>
        <h1>List of Products</h1>
        {products.map(product => {
          return (
            <div style={{width: "300px"}} key={product.id}>
              <div style={{width: "150px", display:"inline-block", textAlign: "left"}}>
                <Link to={`product/${product.id}`}>
                  {product.name}
                </Link>
              </div>
              <div style={{width: "150px", display:"inline-block", textAlign: "right"}}>
                <Link to={`product/${product.id}/edit`}>
                  Edit
                </Link>
                &nbsp;
                &nbsp;
                <a href="" onClick={() => removeProduct("mutation{removeProduct(id){id, name}}")}>
                  Delete
                </a>
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