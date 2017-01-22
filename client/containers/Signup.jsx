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
    signup(`mutation{signup(${dataStr}){user{id, name, email}, token}}`).then(() => {
      browserHistory.push('/products');
    }, (error) => console.log(error));
  }
  render() {
    const {} = this.props;

    return (
      <div>
        <div style={{width: "300px", margin: "0 auto"}}>
          <SignupForm.test signup={(user) => this.signup(user)} initialValues={{
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
    return {};
  },
  (dispatch) => {
    return {
      signup: (payload) => {
        return dispatch(signup(payload));
      }
    };
  }
)(Signup);