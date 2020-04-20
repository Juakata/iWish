import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Face from '../assets/bakiFace.png';
import Logo from '../assets/logo.png';
import Event from '../components/event';
import HumanDate from '../components/humanDate';
import {
  destroySession, createProfile, addWish, openMenu, createRequests,
  addWishesgivers, createMyEvents, removeAllevent, addComingevent,
} from '../actions/index';

class Home extends React.Component {
  constructor(props) {
    super(props);
    const { events } = this.props;
    const n = events.allevents.length;
    this.state = {
      message: n === 0 ? 'No events to show.' : '',
    };
  }

  componentDidMount() {
    const {
      session, history, createProfile, addWishesgivers, createMyEvents,
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
      const myEvents = [];
      axios.get(`v1/getmyevents?email=${session}`)
        .then(response => {
          response.data.events.forEach(myevent => {
            axios.get(`v1/getitems?event=${myevent.id}`)
              .then(response2 => {
                const addevent = {
                  id: myevent.id,
                  title: myevent.title,
                  description: myevent.description,
                  date: myevent.date,
                  time: myevent.time,
                  profile: response.data.profile,
                  people: [],
                  items: response2.data,
                };
                myEvents.push(addevent);
              })
              .catch(() => {});
          });
          createMyEvents(myEvents);
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

  assistEvent = index => {
    const {
      session, events, removeAllevent, addComingevent,
    } = this.props;
    const comingEvent = events.allevents[index];
    axios.get(`v1/createeventguest?email=${session}&id=${comingEvent.id}`)
      .then(() => {
        removeAllevent(comingEvent.id);
        addComingevent(comingEvent);
      })
      .catch(() => {});
  }

  render() {
    const { message } = this.state;
    const { destroySession, events } = this.props;
    const renderAllevents = events.allevents.map((allevent, index) => (
      <Event
        key={allevent.id}
        currentEvent={allevent}
        date=<HumanDate date={allevent.date} time={allevent.time} />
        all
        assistEvent={() => this.assistEvent(index)}
      />
    ));
    return (
      <div>
        <Header source={Logo} menu={this.menu} out={destroySession} />
        <div className="container">
          {message}
          <div className="grid">
            {renderAllevents}
          </div>
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
  createMyEvents: PropTypes.func.isRequired,
  events: PropTypes.instanceOf(Object).isRequired,
  removeAllevent: PropTypes.func.isRequired,
  addComingevent: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  session: state.session,
  functions: state.functions,
  events: state.events,
});

const mapDispatchToProps = dispatch => ({
  destroySession: () => dispatch(destroySession()),
  createProfile: profile => dispatch(createProfile(profile)),
  addWish: wish => dispatch(addWish(wish)),
  openMenu: open => dispatch(openMenu(open)),
  createRequests: requests => dispatch(createRequests(requests)),
  addWishesgivers: wishesgivers => dispatch(addWishesgivers(wishesgivers)),
  createMyEvents: myEvents => dispatch(createMyEvents(myEvents)),
  removeAllevent: allEvent => dispatch(removeAllevent(allEvent)),
  addComingevent: comingEvent => dispatch(addComingevent(comingEvent)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
