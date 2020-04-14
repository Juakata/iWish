import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Logo from '../assets/logo.png';
import {
  destroySession, openMenu, addNew, addSent, removeNew, removeSent,
  removeReceived, removeFriend, addFriend, addGiver, removeGiver,
} from '../actions/index';
import BtnsHeader from '../components/btnsHeader';
import Friend from '../components/friend';
import HandleRequests from '../components/handleRequests';
import ShowFriend from '../components/showFriend';
import HumanDate from '../components/humanDate';

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFriend: false,
      myFriends: true,
      txt1: 'Received',
      txt2: 'New',
      txt3: 'Sent',
      times: 0,
      change: false,
      turns: 1,
      name: '',
      source: '',
      birthday: '',
      sendWishGivers: {},
      renderGivers: '',
      currentWish: '',
      currentProfile: '',
      isGiver: false,
      filter: '',
    };
  }

  componentDidMount() {
    const { session, history } = this.props;
    if (session === '' || session === 'destroy') {
      history.push('/');
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

  handleMyFriends = () => {
    this.setState({
      myFriends: true,
    });
  }

  handleNewFriends = () => {
    this.setState({
      myFriends: false,
    });
  }

  backwardAction = () => {
    const r1 = document.getElementById('h2R1');
    const r2 = document.getElementById('h2R2');
    const btnBackR = document.getElementById('btn-backR');
    btnBackR.style.pointerEvents = 'none';
    r1.style.transform = 'translateX(-800%)';
    r2.style.transform = 'translateX(0)';
    setTimeout(() => {
      r1.style.opacity = '0';
      this.setState(state => ({
        txt1: state.txt2,
        txt2: state.txt3,
        txt3: state.txt1,
        change: (state.txt1 !== 'New' && state.turns % 2 !== 0) || (state.txt1 === 'New' && state.turns % 2 === 0),
        times: state.times === 2 ? 0 : state.times + 1,
        turns: state.times === 2 ? state.turns + 1 : state.turns,
      }));
    }, 1000);
    setTimeout(() => {
      r1.style.opacity = '1';
      const aux = r1.id;
      r1.id = r2.id;
      r2.id = aux;
      btnBackR.style.pointerEvents = 'auto';
    }, 1500);
  }

  addFriend = id => {
    const {
      session, removeNew, requests, addSent,
    } = this.props;
    axios.get(`v1/addfriend?email=${session}&id=${id}`)
      .then(response => {
        if (response.data.result === 'Created.') {
          const sent = requests.newRequests.filter(ele => ele.id === id)[0];
          addSent(sent);
          removeNew(id);
        }
      })
      .catch(() => {});
  }

  cancelRequest = id => {
    const {
      session, removeSent, addNew, requests,
    } = this.props;
    axios.get(`v1/destroyrelation?email=${session}&id=${id}`)
      .then(response => {
        if (response.data.result === 'Destroy') {
          const newRequest = requests.sent.filter(ele => ele.id === id)[0];
          addNew(newRequest);
          removeSent(id);
        }
      })
      .catch(() => {});
  }

  acceptFriend = id => {
    const {
      session, removeReceived, addFriend, requests,
    } = this.props;
    axios.get(`v1/acceptfriend?email=${session}&id=${id}`)
      .then(() => {
        const friend = requests.received.filter(ele => ele.id === id)[0];
        removeReceived(id);
        addFriend(friend);
      })
      .catch(() => {});
  }

  deleteFriend = id => {
    const {
      session, removeFriend, addNew, requests,
    } = this.props;
    axios.get(`v1/destroyrelation?email=${session}&id=${id}`)
      .then(response => {
        if (response.data.result === 'Destroy') {
          const newRequest = requests.friends.filter(ele => ele.id === id)[0];
          addNew(newRequest);
          removeFriend(id);
        }
      })
      .catch(() => {});
  }

  profileAction = friend => {
    if (friend !== 0) {
      const {
        id, name, birthday, picture,
      } = friend;
      const { wishesgivers } = this.props;
      const sendWishGivers = wishesgivers.filter(e => e.id === id)[0];
      const month = birthday.split('-')[1];
      const day = birthday.split('-')[2];
      const year = birthday.split('-')[0];
      this.setState(state => ({
        showFriend: !state.showFriend,
        name,
        source: picture,
        birthday: <HumanDate
          month={month}
          day={day}
          year={year}
        />,
        sendWishGivers,
      }));
    } else {
      this.setState(state => ({
        showFriend: !state.showFriend,
      }));
    }
  }

  hideGivers = () => {
    const giversCont = document.getElementById('givers-btns-cont');
    giversCont.style.display = 'none';
  }

  addMeAsGiver = (profileId, wish) => {
    const { session, addGiver, profile } = this.props;
    axios.get(`v1/addgiver?email=${session}&id=${wish}`)
      .then(() => {
        const giver = {
          id: profile.id,
          name: profile.name,
          picture: profile.picture,
        };
        addGiver(profileId, wish, giver);
        this.hideGivers();
      })
      .catch(() => {});
  }

  removeAsGiver = (profileId, wish) => {
    const { removeGiver, profile } = this.props;
    axios.get(`v1/removegiver?profile=${profile.id}&id=${wish}`)
      .then(() => {
        removeGiver(profileId, wish, profile.id);
        this.hideGivers();
      })
      .catch(() => {});
  }

  showGivers = ids => {
    const { profileId, wish } = ids;
    const { wishesgivers, profile } = this.props;
    let isGiver = false;
    const wishGivers = wishesgivers.filter(wishGivers => wishGivers.id === profileId);
    const givers = wishGivers[0].wishgivers.filter(wishGiver => wishGiver.id === wish);
    const renderGivers = givers[0].givers.map(giver => {
      if (profile.id === giver.id) {
        isGiver = true;
      }
      return (
        <div className="giver-cont" key={giver.id}>
          <img src={giver.picture} alt="giver" />
          <span>{giver.name}</span>
        </div>
      );
    });
    document.getElementById('givers-btns-cont').style.display = 'flex';
    this.setState({
      renderGivers,
      currentWish: wish,
      currentProfile: profileId,
      isGiver,
    });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { destroySession } = this.props;
    const {
      myFriends, txt1, txt2, change, showFriend, name,
      source, birthday, sendWishGivers, renderGivers, currentWish,
      currentProfile, isGiver, filter,
    } = this.state;
    const { requests } = this.props;
    const {
      friends, received, newRequests, sent,
    } = requests;
    let renderFriends; let renderNewRequests;
    let renderSentRequests; let renderReceivedRequests;
    const reg = new RegExp(filter, 'i');
    if (!showFriend) {
      renderNewRequests = newRequests.map(request => {
        if (reg.exec(request.name)) {
          return (
            <Friend
              source={request.picture}
              key={request.id}
              name={request.name}
              text="Add Friend"
              onClick={() => this.addFriend(request.id)}
            />
          );
        }
        return null;
      });

      renderReceivedRequests = received.map(request => {
        if (reg.exec(request.name)) {
          return (
            <Friend
              source={request.picture}
              key={request.id}
              name={request.name}
              text="Accept"
              onClick={() => this.acceptFriend(request.id)}
            />
          );
        }
        return null;
      });
      renderSentRequests = sent.map(request => {
        if (reg.exec(request.name)) {
          return (
            <Friend
              source={request.picture}
              key={request.id}
              name={request.name}
              text="Cancel"
              icon="fas fa-user-minus"
              onClick={() => this.cancelRequest(request.id)}
            />
          );
        }
        return null;
      });
      renderFriends = friends.map(friend => {
        if (reg.exec(friend.name)) {
          return (
            <Friend
              source={friend.picture}
              key={friend.id}
              name={friend.name}
              text="Delete friend"
              icon="fas fa-user-minus"
              onClick={() => this.deleteFriend(friend.id)}
              profileAction={() => this.profileAction(friend)}
              status
            />
          );
        }
        return null;
      });
    }

    return (
      <div>
        <Header source={Logo} menu={this.menu} out={destroySession} />
        {!showFriend ? (
          <div className="container remove-padding">
            <BtnsHeader
              handleMyFriends={this.handleMyFriends}
              handleNewFriends={this.handleNewFriends}
            />
            {!myFriends ? renderFriends
              : (
                <HandleRequests
                  backwardAction={this.backwardAction}
                  furtherAction={this.furtherAction}
                  text={txt1}
                  text2={txt2}
                  change={change}
                />
              )}
            <form className="people-filter">
              <input
                type="text"
                name="filter"
                value={filter}
                onChange={this.handleChange}
              />
              <i className="fas fa-search" />
            </form>
            {myFriends && txt1 === 'New' && renderNewRequests}
            {myFriends && txt1 === 'Received' && renderReceivedRequests }
            {myFriends && txt1 === 'Sent' && renderSentRequests}
          </div>
        ) : (
          <div>
            <ShowFriend
              name={name}
              goBack={() => this.profileAction(0)}
              source={source}
              birthday={birthday}
              handleGivers={id => this.handleGivers(id)}
              wishesgivers={sendWishGivers}
              showGivers={(event, ids) => this.showGivers(event, ids)}
            />
            <div id="givers-btns-cont">
              <button onClick={this.hideGivers} type="button">
                <i className="fas fa-times" />
              </button>
              <div className="givers-cont">
                {renderGivers}
              </div>
              {isGiver ? (
                <button onClick={() => this.removeAsGiver(currentProfile, currentWish)} type="button">
                  <i className="fas fa-user-minus" />
                </button>
              ) : (
                <button onClick={() => this.addMeAsGiver(currentProfile, currentWish)} type="button">
                  <i className="fas fa-user-plus" />
                </button>
              )}

            </div>
          </div>
        )}
      </div>
    );
  }
}

Friends.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  session: PropTypes.string.isRequired,
  destroySession: PropTypes.func.isRequired,
  functions: PropTypes.instanceOf(Object).isRequired,
  openMenu: PropTypes.func.isRequired,
  requests: PropTypes.instanceOf(Object).isRequired,
  addNew: PropTypes.func.isRequired,
  addSent: PropTypes.func.isRequired,
  removeNew: PropTypes.func.isRequired,
  removeSent: PropTypes.func.isRequired,
  removeReceived: PropTypes.func.isRequired,
  removeFriend: PropTypes.func.isRequired,
  addFriend: PropTypes.func.isRequired,
  wishesgivers: PropTypes.instanceOf(Object).isRequired,
  addGiver: PropTypes.func.isRequired,
  removeGiver: PropTypes.func.isRequired,
  profile: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  session: state.session,
  functions: state.functions,
  requests: state.requests,
  wishesgivers: state.wishesgivers,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  destroySession: () => dispatch(destroySession()),
  openMenu: open => dispatch(openMenu(open)),
  addNew: newRequest => dispatch(addNew(newRequest)),
  addSent: sent => dispatch(addSent(sent)),
  removeNew: id => dispatch(removeNew(id)),
  removeSent: id => dispatch(removeSent(id)),
  removeReceived: id => dispatch(removeReceived(id)),
  removeFriend: id => dispatch(removeFriend(id)),
  addFriend: friend => dispatch(addFriend(friend)),
  addGiver: (profile, wish, giver) => dispatch(addGiver(profile, wish, giver)),
  removeGiver: (profile, wish, giver) => dispatch(removeGiver(profile, wish, giver)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Friends));
