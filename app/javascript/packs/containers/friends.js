import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Logo from '../assets/logo.png';
import {
  destroySession, openMenu, addNew, addSent, removeNew, removeSent,
  removeReceived, removeFriend, addFriend,
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
      const { name, picture, birthday } = friend;
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
      }));
    } else {
      this.setState(state => ({
        showFriend: !state.showFriend,
      }));
    }
  }

  render() {
    const { destroySession } = this.props;
    const {
      myFriends, txt1, txt2, change, showFriend,
      name, source, birthday,
    } = this.state;
    const { requests } = this.props;
    const {
      friends, received, newRequests, sent,
    } = requests;
    let renderFriends; let renderNewRequests;
    let renderSentRequests; let renderReceivedRequests;
    if (!showFriend) {
      renderNewRequests = newRequests.map(request => (
        <Friend
          source={request.picture}
          key={request.id}
          name={request.name}
          text="Add Friend"
          onClick={() => this.addFriend(request.id)}
        />
      ));

      renderReceivedRequests = received.map(request => (
        <Friend
          source={request.picture}
          key={request.id}
          name={request.name}
          text="Accept"
          onClick={() => this.acceptFriend(request.id)}
        />
      ));
      renderSentRequests = sent.map(request => (
        <Friend
          source={request.picture}
          key={request.id}
          name={request.name}
          text="Cancel"
          icon="fas fa-user-minus"
          onClick={() => this.cancelRequest(request.id)}
        />
      ));
      renderFriends = friends.map(friend => (
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
      ));
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
            {myFriends && renderFriends}
            {!myFriends && (
              <HandleRequests
                backwardAction={this.backwardAction}
                furtherAction={this.furtherAction}
                text={txt1}
                text2={txt2}
                change={change}
              />
            )}
            {!myFriends && txt1 === 'New' && renderNewRequests}
            {!myFriends && txt1 === 'Received' && renderReceivedRequests }
            {!myFriends && txt1 === 'Sent' && renderSentRequests}
          </div>
        ) : (
          <ShowFriend
            name={name}
            goBack={() => this.profileAction(0)}
            source={source}
            birthday={birthday}
          />
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
};

const mapStateToProps = state => ({
  session: state.session,
  functions: state.functions,
  requests: state.requests,
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
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Friends));
