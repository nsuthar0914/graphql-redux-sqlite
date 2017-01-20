import React from 'react';
import { connect } from 'react-redux';
import {getProducts} from '../actions/products.actions.js';
import {Link} from 'react-router';

class ProductList extends React.Component {
  componentWillMount() {
    const {getProducts} = this.props;
    getProducts("{products{id, name}}")
  }
  render() {
    const {products, fetching} = this.props;
    return (
      <div>
        <h1>List of Products</h1>
        {products.map(product => {
          return (
            <div key={product.id}>
              <Link to={`product/${product.id}`}>
                {product.name}
              </Link>
            </div>
          );
        })}
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
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);