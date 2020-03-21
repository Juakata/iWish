import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Logo from '../assets/logo.png';
import Face from '../assets/bakiFace.png';
import Face2 from '../assets/faces/woman1.jpg';
import Face3 from '../assets/faces/man1.jpg';
import Face4 from '../assets/faces/woman2.jpg';
import Face5 from '../assets/faces/man3.jpg';
import Face6 from '../assets/faces/woman3.jpg';
import Face7 from '../assets/faces/man4.jpg';
import Face8 from '../assets/faces/woman4.jpg';
import Face9 from '../assets/faces/man5.jpg';
import Face10 from '../assets/faces/woman5.jpg';
import Face11 from '../assets/faces/man6.jpg';
import Face12 from '../assets/faces/woman6.png';
import Face13 from '../assets/faces/man7.jpg';
import Face14 from '../assets/faces/woman7.png';
import Face15 from '../assets/faces/man8.jpg';
import Face16 from '../assets/faces/woman8.jpg';
import { destroySession } from '../actions/index';
import ImgBtn from '../components/imgBtn';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      birthday: '1995-03-12',
      openWindow: false,
      picture: Face,
    };
  }

  componentDidMount() {
    const { session, history } = this.props;
    if (session === '') {
      history.push('/');
    } else {
      axios.get(`v1/getprofile?email=${session}`)
        .then(response => {
          this.setState({
            name: response.data.name,
            birthday: response.data.birthday,
            picture: response.data.picture,
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
      openWindow: false,
    });
  }

  render() {
    const {
      name, birthday, openWindow, picture,
    } = this.state;
    const { destroySession } = this.props;
    return (
      <div>
        <Header source={Logo} out={destroySession} />
        {openWindow && (
          <div className="cover-img-selector">
            <div className="imagesSelector">
              <ImgBtn source={Face} id="img-btn-1" onClick={() => this.handlePicture(Face)} />
              <ImgBtn source={Face2} id="img-btn-2" onClick={() => this.handlePicture(Face2)} />
              <ImgBtn source={Face3} id="img-btn-3" onClick={() => this.handlePicture(Face3)} />
              <ImgBtn source={Face4} id="img-btn-4" onClick={() => this.handlePicture(Face4)} />
              <ImgBtn source={Face5} id="img-btn-5" onClick={() => this.handlePicture(Face5)} />
              <ImgBtn source={Face6} id="img-btn-6" onClick={() => this.handlePicture(Face6)} />
              <ImgBtn source={Face7} id="img-btn-7" onClick={() => this.handlePicture(Face7)} />
              <ImgBtn source={Face8} id="img-btn-8" onClick={() => this.handlePicture(Face8)} />
              <ImgBtn source={Face9} id="img-btn-9" onClick={() => this.handlePicture(Face9)} />
              <ImgBtn source={Face10} id="img-btn-10" onClick={() => this.handlePicture(Face10)} />
              <ImgBtn source={Face11} id="img-btn-11" onClick={() => this.handlePicture(Face11)} />
              <ImgBtn source={Face12} id="img-btn-12" onClick={() => this.handlePicture(Face12)} />
              <ImgBtn source={Face13} id="img-btn-13" onClick={() => this.handlePicture(Face13)} />
              <ImgBtn source={Face14} id="img-btn-14" onClick={() => this.handlePicture(Face14)} />
              <ImgBtn source={Face15} id="img-btn-15" onClick={() => this.handlePicture(Face15)} />
              <ImgBtn source={Face16} id="img-btn-16" onClick={() => this.handlePicture(Face16)} />
            </div>
          </div>
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
              type="birthday"
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
};

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = dispatch => ({
  destroySession: () => dispatch(destroySession()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
