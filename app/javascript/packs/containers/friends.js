import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Logo from '../assets/logo.png';
import { destroySession, openMenu } from '../actions/index';
import BtnsHeader from '../components/btnsHeader';

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'Friends ',
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

  }

  handleNewFriends = () => {

  }

  render() {
    const { destroySession } = this.props;
    return (
      <div>
        <Header source={Logo} menu={this.menu} out={destroySession} />
        <div className="container remove-padding">
          <BtnsHeader
            handleMyFriends={this.handleMyFriends}
            handleNewFriends={this.handleNewFriends}
          />
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
