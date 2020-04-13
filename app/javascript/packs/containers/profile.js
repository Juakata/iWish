import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Wish from '../components/wish';
import Message from '../components/message';
import Logo from '../assets/logo.png';
import {
  destroySession, getFaces, addWish, openMenu, updateWish, deleteWish,
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
      wishId: -1,
      title: '',
      description: '',
      wishCreated: false,
      message: '',
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
      wishCreated: false,
    }));
  }

  deleteWish = () => {
    const { wishId } = this.state;
    const { deleteWish, session } = this.props;
    axios.get(`v1/deletewish?email=${session}&wishId=${wishId}`)
      .then(() => {
        deleteWish(wishId);
      })
      .catch(() => {});
    this.handleWishList();
  }

  handleSubmit = event => {
    event.preventDefault();
    const { id } = event.target[event.target.length - 1];
    const { session, addWish, updateWish } = this.props;
    const {
      name, birthday, picture, wishId, title, description,
    } = this.state;
    switch (id) {
      case 'btnProfile':
        axios.get(`v1/setprofile?email=${session}&name=${name}&birthday=${birthday}&picture=${picture}`)
          .then(response => {
            if (response.data.result === 'Profile updated.') {
              this.setState({
                message: 'Profile successfully updated.',
              });
              const styleElement = document.querySelector('.p-message-ok').style;
              styleElement.bottom = '0';
              styleElement.transform = 'translateY(-40px)';
              styleElement.opacity = '1';
              styleElement.bottom = '-20px';
              setTimeout(() => {
                styleElement.opacity = '0';
                styleElement.transform = 'translateY(0)';
                document.getElementById('title').focus();
              }, 2000);
            }
          })
          .catch(() => {});
        break;
      case 'btnAddWish':
        axios.get(`v1/createwish?email=${session}&title=${title}&description=${description}`)
          .then(response => {
            const wish = {
              id: response.data.id,
              title,
              description,
            };
            addWish(wish);
          })
          .catch(() => {});
        this.handleWishList();
        break;
      case 'btnUpdateWish':
        axios.get(`v1/updatewish?email=${session}&wishId=${wishId}&title=${title}&description=${description}`)
          .then(() => {
            const wish = {
              id: wishId,
              title,
              description,
            };
            updateWish(wish);
            this.setState({
              wishCreated: false,
            });
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

  handleWish = wish => {
    this.setState(state => ({
      openForm: !state.openForm,
      wishId: wish.id,
      title: wish.title,
      description: wish.description,
      wishCreated: true,
    }));
  }

  render() {
    const {
      name, birthday, openWindow, picture, openForm,
      title, description, wishCreated, message,
    } = this.state;
    const { profile } = this.props;
    const wishes = typeof profile.wishes !== 'undefined' ? profile.wishes : [];
    const wishesRender = wishes.map(wish => (
      <Wish
        key={wish.id}
        id={wish.id}
        title={wish.title}
        description={wish.description}
        onClick={() => this.handleWish(wish)}
      />
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
                id="title"
                name="title"
                value={title}
                placeholder="Gift's name."
                onChange={this.handleChange}
                required
              />
              <textarea
                name="description"
                value={description}
                placeholder="Gift's description."
                onChange={this.handleChange}
                required
              />
              {!wishCreated && (
                <div className="btnsCont">
                  <button type="button" onClick={this.handleWishList}>Close</button>
                  <button id="btnAddWish" type="submit">Save</button>
                </div>
              )}
              {wishCreated && (
                <div className="btnsCont">
                  <button type="button" onClick={this.deleteWish}>Delete</button>
                  <button id="btnUpdateWish" type="submit">Update</button>
                </div>
              )}
            </form>
          </div>
        )}
        <div className="container">
          <Message text={message} />
          <form className="profile-form" onSubmit={this.handleSubmit}>
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
            <button id="btnProfile" type="submit">Save</button>
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
  updateWish: PropTypes.func.isRequired,
  deleteWish: PropTypes.func.isRequired,
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
  updateWish: wish => dispatch(updateWish(wish)),
  deleteWish: wishId => dispatch(deleteWish(wishId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
