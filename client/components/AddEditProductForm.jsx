import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import {getProduct} from '../actions/products.actions.js';
import {Link} from 'react-router';

class AddEditProductForm extends React.Component {
  render() {
    const {handleSubmit, load, pristine, reset, submitting, fetching} = this.props;
    return (
      <div style={{textAlign:"center"}}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <div>
              <Field name="name" component="input" type="text" placeholder="Name"/>
            </div>
          </div>
          <br />
          <div>
            <label>Description</label>
            <div>
              <Field name="description" component="textarea" rows="10"/>
            </div>
          </div>
          <br />
          <div>
            <label>Image Url</label>
            <div>
              <Field name="image" component="input" type="text" placeholder="Image Url"/>
            </div>
          </div>
          <br />
          <div>
            <label>Cost</label>
            <div>
              <Field name="cost" component="input" type="number" placeholder="Cost"/>
            </div>
          </div>
          <br />
          <div>
            <label>Quantity</label>
            <div>
              <Field name="quantity" component="input" type="number" placeholder="Quantity"/>
            </div>
          </div>
          <br />
          <div>
            <button type="submit" disabled={pristine || submitting}>Submit</button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>Undo Changes</button>
          </div>
        </form>
      </div>
    )
  }
}


export default {test: reduxForm({
  form: 'addEditProductForm',
})(AddEditProductForm)};