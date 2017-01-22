import React from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';

import {signup} from '../actions/login.actions.js';

import SignupForm from '../components/SignupForm.jsx';

class Signup extends React.Component {
  signup(user) {
    const {signup} = this.props;
    console.log(user);
    let dataStr = `email: "${user.email}", password: "${user.password}"`;
    if (user.name) dataStr += `, name: "${user.name}"`
    signup(`mutation{signup(${dataStr}){user{id, name, email}, token}}`).then((data) => {
      if (!data.response.errors) {
        browserHistory.push('/products');
      } else {
        console.log(data.response.errors)
      }
    });
  }
  render() {
    const {error} = this.props;

    return (
      <div>
        <div style={{width: "300px", margin: "0 auto"}}>
          <SignupForm.test stateError={error} signup={(user) => this.signup(user)} initialValues={{
            name: "",
            email: "",
            password: ""
          }}/>
        </div>
      </div>
    )
  }
}
export default connect(
  (state) => {
    return {
      error: state.login.get("error")
    };
  },
  (dispatch) => {
    return {
      signup: (payload) => {
        return dispatch(signup(payload));
      }
    };
  }
)(Signup);