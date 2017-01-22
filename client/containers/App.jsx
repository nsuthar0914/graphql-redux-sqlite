import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';

import {logout} from '../actions/login.actions.js';

class App extends React.Component {

  render() {
    const {user, logout, location} = this.props;
    return (
      <section id="app">
        <div style={{textAlign: "center"}}>

        {user && user.get("email")
          ? <div style={{float: "right", width:"300px", display:"inline-block"}}>
            {(location.pathname != '/' && location.pathname != '/products') && <Link to="/">Home</Link>} &nbsp;&nbsp;
            Hello, {user.get("name") || user.get("email")} &nbsp;&nbsp;
            <button onClick={logout}>Logout</button>
          </div>
          : <div style={{float: "right", width:"200px", display:"inline-block"}}>
            {(location.pathname != '/' && location.pathname != '/products') && <Link to="/">Home</Link>} &nbsp;&nbsp;
            {location.pathname != '/login' && <Link to="/login">Login</Link>} &nbsp;&nbsp;
            {location.pathname != '/signup' &&<Link to="/signup">Signup</Link>}
          </div>}
          <h1>Product Listing Application</h1>
        </div>
        {this.props.children} 
      </section>
    )
  }
}
export default connect(
  (state) => {
    return {
      user: state.login.get("user"),
    };
  },
  (dispatch) => {
    return {
      logout: () => dispatch(logout())
    };
  }
)(App);