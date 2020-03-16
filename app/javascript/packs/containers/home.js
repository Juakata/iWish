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
    const { session } = this.props;
    return (
      <div>
        <h1>{test}</h1>
        <h1>{session}</h1>
        <button type="button" onClick={this.signout}>Sign Out</button>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  session: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  session: state.session,
});

export default withRouter(connect(mapStateToProps, null)(Home));
