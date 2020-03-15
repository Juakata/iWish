import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'hola',
    };
  }

  render() {
    const { test } = this.state;
    return (
      <h1>{test}</h1>
    );
  }
}

export default withRouter(connect(null, null)(Home));
