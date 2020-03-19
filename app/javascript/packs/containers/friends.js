import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Logo from '../assets/logo.png';
import { destroySession } from '../actions/index';

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'Friends ',
    };
  }

  componentDidMount() {
    const { session, history } = this.props;
    if (session === '') {
      history.push('/');
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

Friends.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  session: PropTypes.string.isRequired,
  destroySession: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = dispatch => ({
  destroySession: () => dispatch(destroySession()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Friends));
