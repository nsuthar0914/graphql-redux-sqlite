import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import {isValidEmail} from '../utils.jsx';

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Not a valid email'
  }
  if (!values.password) {
    errors.password = 'Required'
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

class LoginForm extends React.Component {
  render() {
    const {handleSubmit, load, pristine, reset, submitting, fetching, login, stateError} = this.props;
    console.log(stateError);
    return (
      <div style={{textAlign:"center"}}>
        {stateError && <small>{stateError}</small>}
        <form onSubmit={handleSubmit(login)}>
          <div>
            <label>Email*</label>
            <div>
              <Field name="email" component={renderField} type="text" placeholder="Email"/>
            </div>
          </div>
          <br />
          <div>
            <label>Password*</label>
            <div>
              <Field name="password" component={renderField} type="password" placeholder="Password"/>
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
  form: 'loginForm',
  validate
})(LoginForm)};