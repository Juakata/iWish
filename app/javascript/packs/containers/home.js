import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'hola',
    };
  }

  signout = () => {
    const { history } = this.props;
    axios.get('v1/signout')
      .then(response => {
        if (response.data.result) {
          history.push('/');
        }
      })
      .catch(() => {});
  }

  render() {
    const { test } = this.state;
    return (
      <div>
        <h1>{test}</h1>
        <button type="button" onClick={this.signout}>Sign Out</button>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(connect(null, null)(Home));
