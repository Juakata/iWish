import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Face from '../assets/bakiFace.png';
import Logo from '../assets/logo.png';
import { destroySession, createProfile, addWish } from '../actions/index';

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
      let profile;
      axios.get(`v1/getprofile?email=${session}`)
        .then(response => {
          if (typeof response.data.result === 'undefined') {
            axios.get(`v1/getwishes?email=${session}`)
              .then(response2 => {
                if (typeof response2.data.result === 'undefined') {
                  const wishes = response2.data.map(wish => (
                    {
                      id: wish.id,
                      title: wish.title,
                      description: wish.description,
                    }
                  ));
                  profile = {
                    name: response.data.name,
                    birthday: response.data.birthday,
                    picture: response.data.picture,
                    wishes,
                  };
                  createProfile(profile);
                } else {
                  profile = {
                    name: response.data.name,
                    birthday: response.data.birthday,
                    picture: response.data.picture,
                    wishes: [],
                  };
                  createProfile(profile);
                }
              })
              .catch(() => {});
          } else {
            profile = {
              name: '',
              birthday: '1995-03-12',
              picture: Face,
              wishes: [],
            };
            createProfile(profile);
          }
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
  addWish: wish => dispatch(addWish(wish)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
