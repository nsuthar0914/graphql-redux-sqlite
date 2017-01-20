import React from 'react';
import { connect } from 'react-redux';
import {getProduct} from '../actions/products.actions.js';
import {Link} from 'react-router';
import AddEditProductForm from '../components/AddEditProductForm.jsx';

class AddEditProduct extends React.Component {
  componentWillMount() {
    const {getProduct, params} = this.props;
    if (params.id) {
      this.waitForData = true;
      let that = this;
      getProduct(`{product(id:"${params.id}"){id, name, description, quantity, cost, image}}`).then(function(){
        that.waitForData = false;
        that.forceUpdate();
      });
    }
  }
  render() {
    const {product, fetching, params} = this.props;
    console.log(fetching, this.waitForData, product.get("id"));
    if (fetching || this.waitForData) {
      return null;
    }
    let initialValues = {};
    if (params.id) {
      initialValues = {
        name: product.get("name"),
        description: product.get("description"),
        image: product.get("image"),
        cost: product.get("cost"),
        quantity: product.get("quantity"),
      }
    }
    return (
      <div>
        <Link style={{float: "right"}} to="/products">Home</Link>
        <AddEditProductForm.test initialValues={initialValues}/>
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
)(AddEditProduct);