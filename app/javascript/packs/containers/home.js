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
  createComingevents,
} from '../actions/index';

class Home extends React.Component {
  componentDidMount() {
    const {
      session, history, createProfile, addWishesgivers, createMyEvents,
      createComingevents,
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
                axios.get(`v1/pullguests?id=${myevent.id}`)
                  .then(response3 => {
                    const addevent = {
                      id: myevent.id,
                      title: myevent.title,
                      description: myevent.description,
                      date: myevent.date,
                      time: myevent.time,
                      profile: response.data.profile,
                      people: response3.data.guests,
                      items: response2.data,
                    };
                    myEvents.push(addevent);
                    createMyEvents(
                      myEvents.sort((a, b) => new Date(a.date) - new Date(b.date)),
                    );
                  })
                  .catch(() => {});
              })
              .catch(() => {});
          });
        })
        .catch(() => {});
      const comingEvents = [];
      axios.get(`v1/pullcomingevents?email=${session}`)
        .then(response => {
          response.data.events.forEach(comingEvent => {
            axios.get(`v1/getitems?event=${comingEvent.id}`)
              .then(response2 => {
                axios.get(`v1/getprofile?id=${comingEvent.user_id}`)
                  .then(response3 => {
                    axios.get(`v1/pullguests?id=${comingEvent.id}`)
                      .then(response4 => {
                        const addevent = {
                          id: comingEvent.id,
                          title: comingEvent.title,
                          description: comingEvent.description,
                          date: comingEvent.date,
                          time: comingEvent.time,
                          profile: response3.data,
                          people: response4.data.guests,
                          items: response2.data,
                        };
                        comingEvents.push(addevent);
                        createComingevents(
                          comingEvents.sort((a, b) => new Date(a.date) - new Date(b.date)),
                        );
                      })
                      .catch(() => {});
                  })
                  .catch(() => {});
              })
              .catch(() => {});
          });
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
      session, events, removeAllevent, addComingevent, profile,
    } = this.props;
    const comingEvent = events.allevents[index];
    axios.get(`v1/createeventguest?email=${session}&id=${comingEvent.id}`)
      .then(() => {
        removeAllevent(comingEvent.id);
        addComingevent(comingEvent, profile);
      })
      .catch(() => {});
  }

  render() {
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
  createComingevents: PropTypes.func.isRequired,
  profile: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  session: state.session,
  functions: state.functions,
  events: state.events,
  profile: state.profile,
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
  addComingevent: (comingEvent, profile) => dispatch(addComingevent(comingEvent, profile)),
  createComingevents: comingEvent => dispatch(createComingevents(comingEvent)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
