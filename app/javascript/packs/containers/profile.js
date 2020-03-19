import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Logo from '../assets/logo.png';
import Face from '../assets/bakiFace.png';
import { destroySession } from '../actions/index';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: '1995-03-12',
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

  handleSubmit = event => {
    event.preventDefault();
    const { name } = this.state;
    console.log(name);
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, date } = this.state;
    const { destroySession } = this.props;
    return (
      <div>
        <Header source={Logo} out={destroySession} />
        <div className="container">
          <form className="profile-form" onSubmit={this.handleSubmit}>
            <i className="fas fa-user profile-icon profile-i-user" />
            <i className="fas fa-calendar profile-icon profile-i-date" />
            <img src={Face} className="lookIcon" alt="Icon" />
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Name"
              onChange={this.handleChange}
              required
            />
            <input
              type="date"
              name="date"
              value={date}
              onChange={this.handleChange}
              required
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
