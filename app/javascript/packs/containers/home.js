import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Face from '../assets/bakiFace.png';
import Logo from '../assets/logo.png';
import { destroySession, createProfile } from '../actions/index';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'Home ',
    };
  }

  componentDidMount() {
    const { session, history, createProfile } = this.props;
    if (session === '') {
      history.push('/');
    } else {
      axios.get(`v1/getprofile?email=${session}`)
        .then(response => {
          let profile;
          if (typeof response.data.result === 'undefined') {
            profile = {
              name: response.data.name,
              birthday: response.data.birthday,
              picture: response.data.picture,
            };
          } else {
            profile = {
              name: '',
              birthday: '1995-03-12',
              picture: Face,
            };
          }
          createProfile(profile);
        })
        .catch(() => {});
    }
  }

  componentDidUpdate(prevProps) {
    const { session, history } = this.props;
    if (prevProps.session !== session) {
      history.push('/');
    }
  }

  render() {
    const { test } = this.state;
    const { session, destroySession } = this.props;
    return (
      <div>
        <Header source={Logo} out={destroySession} />
        <div className="container">
          <span>{test}</span>
          <span>{session}</span>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  session: PropTypes.string.isRequired,
  destroySession: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = dispatch => ({
  destroySession: () => dispatch(destroySession()),
  createProfile: profile => dispatch(createProfile(profile)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
