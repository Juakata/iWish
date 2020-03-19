import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { createSession } from '../actions/index';
import Header from '../components/header';
import Logo from '../assets/logo.png';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'hola',
    };
  }

  componentDidMount() {
    const decodedCookie = decodeURIComponent(document.cookie);
    const { createSession, history } = this.props;
    if (decodedCookie !== '') {
      const ca = decodedCookie.split(';');
      const id = ca[0].split('=')[1];
      const token = ca[1].split('=')[1];
      axios.get(`v1/autosignin?id=${id}&token=${token}`)
        .then(response => {
          if (response.data.email) {
            createSession(response.data.email);
          }
        })
        .catch(() => this.setState({}));
    } else {
      history.push('/');
    }
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
        <Header source={Logo} out={this.signout} />
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
  createSession: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = dispatch => ({
  createSession: user => dispatch(createSession(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
