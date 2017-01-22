import React from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';

import {login} from '../actions/login.actions.js';

import LoginForm from '../components/LoginForm.jsx';

class Login extends React.Component {
  login(user) {
    const {login} = this.props;
    let dataStr = `email: "${user.email}", `;
    login(`mutation{login(${dataStr}){email, token}}`).then(() => {
      browserHistory.push('/products');
    }, (error) => console.log(error));
  }
  render() {
    const {} = this.props;

    return (
      <div>
        <div style={{width: "300px", margin: "0 auto"}}>
          <LoginForm.test login={(user) => this.login(user)} initialValues={{
            email: ""
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
      login: (payload) => {
        return dispatch(login(payload));
      }
    };
  }
)(Login);