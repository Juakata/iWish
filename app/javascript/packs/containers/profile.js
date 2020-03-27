import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Logo from '../assets/logo.png';
import { destroySession, getFaces, addWish } from '../actions/index';
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
  }

  handlePicture = face => {
    this.setState({
      picture: face,
    });
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
        <Header source={Logo} out={destroySession} />
        {openWindow && (
          <button type="button" className="cover-img-selector" onClick={this.handleWindow}>
            <div className="imagesSelector">
              {images}
            </div>
          </button>
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
};

const mapStateToProps = state => ({
  session: state.session,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  destroySession: () => dispatch(destroySession()),
  getFaces: () => dispatch(getFaces()),
  addWish: wish => dispatch(addWish(wish)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
