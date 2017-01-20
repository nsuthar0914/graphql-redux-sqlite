import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import {getProduct} from '../actions/products.actions.js';
import {Link} from 'react-router';

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  return errors
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/><br />
      {touched && (error && <small>{error}</small>)}
    </div>
  </div>
)

class AddEditProductForm extends React.Component {
  render() {
    const {handleSubmit, load, pristine, reset, submitting, fetching, addOrEdit} = this.props;
    return (
      <div style={{textAlign:"center"}}>
        <form onSubmit={handleSubmit(addOrEdit)}>
          <div>
            <label>Name*</label>
            <div>
              <Field name="name" component={renderField} type="text" placeholder="Name"/>
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
              <Field name="image" component={renderField} type="text" placeholder="Image Url"/>
            </div>
          </div>
          <br />
          <div>
            <label>Cost</label>
            <div>
              <Field name="cost" component={renderField} type="number" placeholder="Cost"/>
            </div>
          </div>
          <br />
          <div>
            <label>Quantity</label>
            <div>
              <Field name="quantity" component={renderField} type="number" placeholder="Quantity"/>
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
  validate
})(AddEditProductForm)};