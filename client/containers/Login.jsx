import React from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';

import {login} from '../actions/login.actions.js';

import LoginForm from '../components/LoginForm.jsx';

class Login extends React.Component {
  login(user) {
    const {login} = this.props;
    let dataStr = `email: "${user.email}", password: "${user.password}"`;
    login(`mutation{login(${dataStr}){user{id, name, email}, token}}`).then((data) => {
      if (!data.response.errors) {
        browserHistory.push('/products');
      } else {
        console.log(data.response.errors)
      }
    });
  }
  render() {
    const {error} = this.props;
    console.log(error)
    return (
      <div>
        <div style={{width: "300px", margin: "0 auto"}}>
          <LoginForm.test stateError={error} login={(user) => this.login(user)} initialValues={{
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
      login: (payload) => {
        return dispatch(login(payload));
      }
    };
  }
)(Login);