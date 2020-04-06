import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Logo from '../assets/logo.png';
import { destroySession, openMenu } from '../actions/index';
import BtnsHeader from '../components/btnsHeader';
import Friend from '../components/friend';
import HandleRequests from '../components/handleRequests';

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sent: [],
      received: [],
      newRequests: [],
      friends: [],
      myFriends: true,
      txt1: 'Received',
      txt2: 'New',
      txt3: 'Sent',
      times: 0,
      change: false,
      turns: 1,
    };
  }

  componentDidMount() {
    const { session, history } = this.props;
    if (session === '' || session === 'destroy') {
      history.push('/');
    } else {
      axios.get(`v1/allrequests?email=${session}`)
        .then(response => {
          this.setState({
            sent: response.data.sent,
            received: response.data.received,
            newRequests: response.data.new,
          });
        })
        .catch(() => {});
      axios.get(`v1/getfriends?email=${session}`)
        .then(response => {
          this.setState({
            friends: response.data.friends,
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
    }, 1000);
    setTimeout(() => {
      r1.style.opacity = '1';
      const aux = r1.id;
      r1.id = r2.id;
      r2.id = aux;
      btnBackR.style.pointerEvents = 'auto';
      this.setState(state => ({
        txt1: state.txt2,
        txt2: state.txt3,
        txt3: state.txt1,
        change: (state.txt1 !== 'New' && state.turns % 2 !== 0) || (state.txt1 === 'New' && state.turns % 2 === 0),
        times: state.times === 2 ? 0 : state.times + 1,
        turns: state.times === 2 ? state.turns + 1 : state.turns,
      }));
    }, 1500);
  }

  render() {
    const { destroySession } = this.props;
    const {
      sent, received, newRequests, friends, myFriends,
      txt1, txt2, change,
    } = this.state;
    const renderNewRequests = newRequests.map(request => (
      <Friend
        source={request.picture}
        key={request.id}
        name={request.name}
        text="Add Friend"
      />
    ));
    const renderReceivedRequests = received.map(request => (
      <Friend
        source={request.picture}
        key={request.id}
        name={request.name}
        text="Accept"
      />
    ));
    const renderSentRequests = sent.map(request => (
      <Friend
        source={request.picture}
        key={request.id}
        name={request.name}
        text="Cancel"
      />
    ));
    const renderFriends = friends.map(friend => (
      <Friend
        source={friend.picture}
        key={friend.id}
        name={friend.name}
        text="Delete friend"
        icon="fas fa-user-minus"
      />
    ));
    return (
      <div>
        <Header source={Logo} menu={this.menu} out={destroySession} />
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
};

const mapStateToProps = state => ({
  session: state.session,
  functions: state.functions,
});

const mapDispatchToProps = dispatch => ({
  destroySession: () => dispatch(destroySession()),
  openMenu: open => dispatch(openMenu(open)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Friends));
