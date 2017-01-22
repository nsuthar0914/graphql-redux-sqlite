import React from 'react';
import { connect } from 'react-redux';
import {getProduct, addProduct, editProduct} from '../actions/products.actions.js';
import {Link, browserHistory} from 'react-router';
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
  addOrEdit(data){
    const {params, addProduct, editProduct} = this.props;
    let dataStr = `name: "${data.name}", `;
    if (data.description) dataStr += `description: "${data.description}", `;
    if (data.quantity) dataStr += `quantity: ${data.quantity}, `;
    if (data.cost) dataStr += `cost: ${data.cost}, `;
    if (data.image) dataStr += `image: "${data.image}", `;
    if (params.id) {
      dataStr += `, id: "${params.id}"`;
      editProduct(`mutation{editProduct(${dataStr}){id, name}}`).then(() => {
        browserHistory.push('/products');
      }, (error) => console.log(error));
    } else {
      addProduct(`mutation{addProduct(${dataStr}){id, name}}`).then(() => {
        browserHistory.push('/products');
      }, (error) => console.log(error));
    }
  }
  render() {
    const {product, fetching, params} = this.props;
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
        <AddEditProductForm.test addOrEdit={(data) => this.addOrEdit(data)} initialValues={initialValues}/>
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
    addProduct: (payload) => {
      return dispatch(addProduct(payload));
    },
    editProduct: (payload) => {
      return dispatch(editProduct(payload));
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditProduct);