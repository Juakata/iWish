import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Logo from '../assets/logo.png';
import {
  destroySession, getFaces, addWish, openMenu,
} from '../actions/index';
import ImgBtn from '../components/imgBtn';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    const { profile } = props;
    this.state = {
      name: profile.name,
      birthday: profile.birthday,
      openWindow: false,
      openForm: false,
      picture: typeof profile.picture !== 'undefined' ? profile.picture : '',
      title: '',
      description: '',
      wishes: typeof profile.wishes !== 'undefined' ? profile.wishes : [],
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

  handleWishList = () => {
    this.setState(state => ({
      openForm: !state.openForm,
      title: '',
      description: '',
    }));
  }

  handleSubmit = event => {
    event.preventDefault();
    const { id } = event.target;
    const { session, addWish } = this.props;
    const {
      name, birthday, picture, title, description, wishes,
    } = this.state;
    switch (id) {
      case 'profileform':
        axios.get(`v1/setprofile?email=${session}&name=${name}&birthday=${birthday}&picture=${picture}`)
          .then(() => {})
          .catch(() => {});
        break;
      case 'wishlistform':
        axios.get(`v1/createwish?email=${session}&title=${title}&description=${description}`)
          .then(() => {
            const wish = {
              id: wishes.length + 1,
              title,
              description,
            };
            addWish(wish);
          })
          .catch(() => {});
        this.handleWishList();
        break;
      default:
    }
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
    const { openWindow } = this.state;
    if (!openWindow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  handlePicture = face => {
    this.setState({
      picture: face,
    });
  }

  menu = () => {
    const { functions, openMenu } = this.props;
    const { open } = functions;
    openMenu(open);
  }

  render() {
    const {
      name, birthday, openWindow, picture, openForm,
      title, description, wishes,
    } = this.state;
    const wishesRender = wishes.map(wish => (
      <div key={wish.id}>{wish.title}</div>
    ));
    const { destroySession, getFaces } = this.props;
    const images = getFaces().faces.map(face => (
      <ImgBtn source={face.src} id="img-btn-1" key={face.id} onClick={() => this.handlePicture(face.src)} />
    ));
    return (
      <div>
        <Header source={Logo} menu={this.menu} out={destroySession} />
        {openWindow && (
          <div
            type="button"
            tabIndex={0}
            role="button"
            className="cover-img-selector"
            onClick={this.handleWindow}
            onKeyPress={this.onKeyPressHandler}
          >
            <div className="imagesSelector">
              {images}
            </div>
          </div>
        )}
        {openForm && (
          <div className="cover-img-selector">
            <form id="wishlistform" className="profile-form-list" onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="title"
                value={title}
                placeholder="Title"
                onChange={this.handleChange}
                required
              />
              <textarea
                name="description"
                value={description}
                placeholder="Description"
                onChange={this.handleChange}
                required
              />
              <button type="submit">Save</button>
              <button type="button" onClick={this.handleWishList}>Close</button>
            </form>
          </div>
        )}
        <div className="container">
          <form id="profileform" className="profile-form" onSubmit={this.handleSubmit}>
            <i className="fas fa-user profile-icon profile-i-user" />
            <i className="fas fa-calendar profile-icon profile-i-birthday" />
            <ImgBtn source={picture} classImg="lookIcon mainIcon" id="img-btn" onClick={this.handleWindow} />
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
          <div className="cont-title-list">
            <button className="mylist-btn" onClick={this.handleWishList} type="button">
              <h2 className="title">My WishList</h2>
              <i className="fas fa-plus my-plus" />
            </button>
            <div className="cont-wishes">
              {wishesRender}
            </div>
          </div>
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
  addWish: PropTypes.func.isRequired,
  functions: PropTypes.instanceOf(Object).isRequired,
  openMenu: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  session: state.session,
  profile: state.profile,
  functions: state.functions,
});

const mapDispatchToProps = dispatch => ({
  destroySession: () => dispatch(destroySession()),
  getFaces: () => dispatch(getFaces()),
  addWish: wish => dispatch(addWish(wish)),
  openMenu: open => dispatch(openMenu(open)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
