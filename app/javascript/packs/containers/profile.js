import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Logo from '../assets/logo.png';
import { destroySession, getFaces } from '../actions/index';
import ImgBtn from '../components/imgBtn';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    const { profile } = props;
    this.state = {
      name: profile.name,
      birthday: profile.birthday,
      openWindow: false,
      picture: profile.picture,
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
    const { session } = this.props;
    const { name, birthday, picture } = this.state;
    axios.get(`v1/setprofile?email=${session}&name=${name}&birthday=${birthday}&picture=${picture}`)
      .then(() => {})
      .catch(() => {});
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleWindow = () => {
    this.setState(state => ({
      openWindow: !state.openWindow,
    }));
  }

  handlePicture = face => {
    this.setState({
      picture: face,
    });
  }

  render() {
    const {
      name, birthday, openWindow, picture,
    } = this.state;
    const { destroySession, getFaces } = this.props;
    const images = getFaces().faces.map(face => (
      <ImgBtn source={face.src} id="img-btn-1" key={face.id} onClick={() => this.handlePicture(face.src)} />
    ));
    return (
      <div>
        <Header source={Logo} out={destroySession} />
        {openWindow && (
          <button type="button" className="cover-img-selector" onClick={this.handleWindow}>
            <div className="imagesSelector">
              {images}
            </div>
          </button>
        )}
        <div className="container">
          <form className="profile-form" onSubmit={this.handleSubmit}>
            <i className="fas fa-user profile-icon profile-i-user" />
            <i className="fas fa-calendar profile-icon profile-i-birthday" />
            <ImgBtn source={picture} id="img-btn" onClick={this.handleWindow} />
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
              name="birthday"
              value={birthday}
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
  getFaces: PropTypes.func.isRequired,
  profile: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  session: state.session,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  destroySession: () => dispatch(destroySession()),
  getFaces: () => dispatch(getFaces()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
