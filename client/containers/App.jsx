import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component {

  render() {
    const {} = this.props;

    return (
      <section id="app">
        {this.props.children} 
      </section>
    )
  }
}
export default connect(
  (state) => {
    return {};
  },
  (dispatch) => {
    return {};
  }
)(App);