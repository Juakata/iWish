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

  render() {
    const { destroySession } = this.props;
    const {
      sent, received, newRequests, friends, myFriends,
    } = this.state;
    const renderNewRequests = newRequests.map(request => (
      <Friend
        source={request.picture}
        key={request.id}
        name={request.name}
        text="Add Friend"
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
          <HandleRequests />
          {myFriends && renderFriends}
          {!myFriends && renderNewRequests}
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
