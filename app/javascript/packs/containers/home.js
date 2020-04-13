import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Face from '../assets/bakiFace.png';
import Logo from '../assets/logo.png';
import {
  destroySession, createProfile, addWish, openMenu, createRequests,
  addWishesgivers,
} from '../actions/index';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'Home ',
    };
  }

  componentDidMount() {
    const {
      session, history, createProfile, addWishesgivers,
    } = this.props;
    const wishgivers = [];
    if (session === '' || session === 'destroy') {
      history.push('/');
    } else {
      axios.get(`v1/allrequests?email=${session}`)
        .then(response => {
          const { createRequests } = this.props;
          createRequests(response.data);
          response.data.friends.forEach(friend => {
            axios.get(`v1/getwishes?id=${friend.id}`)
              .then(response2 => {
                response2.data.forEach(wish => {
                  axios.get(`v1/getgivers?id=${wish.id}`)
                    .then(response3 => {
                      wishgivers.push(response3.data);
                    })
                    .catch(() => {});
                });

                const wishesgivers = {
                  id: friend.id,
                  wishes: response2.data,
                  wishgivers,
                };
                addWishesgivers(wishesgivers);
              })
              .catch(() => {});
          });
        })
        .catch(() => {});
      let profile;
      axios.get(`v1/getprofile?email=${session}`)
        .then(response => {
          axios.get(`v1/getwishes?email=${session}`)
            .then(response2 => {
              const wishes = response2.data.map(wish => (
                {
                  id: wish.id,
                  title: wish.title,
                  description: wish.description,
                }
              ));
              profile = {
                id: response.data.id,
                name: response.data.name,
                birthday: response.data.birthday,
                picture: response.data.picture === '' ? Face : response.data.picture,
                wishes,
              };
              createProfile(profile);
              if (response.data.name === '') {
                history.push('/profile');
              }
            })
            .catch(() => {});
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

  menu = () => {
    const { functions, openMenu } = this.props;
    const { open } = functions;
    openMenu(open);
  }

  render() {
    const { test } = this.state;
    const { session, destroySession } = this.props;
    return (
      <div>
        <Header source={Logo} menu={this.menu} out={destroySession} />
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
  functions: PropTypes.instanceOf(Object).isRequired,
  openMenu: PropTypes.func.isRequired,
  createRequests: PropTypes.func.isRequired,
  addWishesgivers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  session: state.session,
  functions: state.functions,
});

const mapDispatchToProps = dispatch => ({
  destroySession: () => dispatch(destroySession()),
  createProfile: profile => dispatch(createProfile(profile)),
  addWish: wish => dispatch(addWish(wish)),
  openMenu: open => dispatch(openMenu(open)),
  createRequests: requests => dispatch(createRequests(requests)),
  addWishesgivers: wishesgivers => dispatch(addWishesgivers(wishesgivers)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
