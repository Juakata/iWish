import React from 'react';
import { connect } from 'react-redux';
import Fingerprint2 from 'fingerprintjs2';
import {
  Link, withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Logo from '../assets/logo.png';
import { createSession } from '../actions/index';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      repeat: '',
      error: '',
      key: '',
    };
  }

  componentDidMount() {
    if (window.requestIdleCallback) {
      requestIdleCallback(() => {
        Fingerprint2.get(components => {
          this.setState({
            key: components[0].value.replace(';', ','),
          });
          const decodedCookie = decodeURIComponent(document.cookie);
          const { history, createSession, session } = this.props;
          if (session !== 'destroy' && session !== '') {
            history.push('/home');
          } else if (session === 'destroy') {
            axios.get('v1/signout')
              .then(() => {})
              .catch(() => {});
          } else if (decodedCookie !== '') {
            const ca = decodedCookie.split(';');
            const id = ca[0].split('=')[1];
            const token = ca[1].split('=')[1];
            const { key } = this.state;
            axios.get(`v1/autosignin?id=${id}&token=${token}&key=${key}`)
              .then(response => {
                if (response.data.email) {
                  createSession(response.data.email);
                  history.push('/home');
                }
              })
              .catch(error => this.setState({ error }));
          }
        });
      });
    } else {
      setTimeout(() => {
        Fingerprint2.get(components => {
          this.setState({
            key: components[0].value.replace(';', ','),
          });
        });
      }, 500);
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const {
      email, password, repeat, key,
    } = this.state;
    const { history, createSession } = this.props;
    if (password === repeat && password.length > 7) {
      axios.get(`v1/signup?email=${email}&password_digest=${password}&repeat=${repeat}&key=${key}`)
        .then(response => {
          switch (response.data.result) {
            case 'created':
              createSession(response.data.email);
              history.push('/home');
              break;
            case 'user_errors':
              if (response.data.user.password_digest) {
                this.setState({ error: `Password ${response.data.user.password_digest}` });
              } else {
                this.setState({ error: 'Email has been already used.' });
              }
              break;
            case 'bad_passwords':
              this.setState({ error: 'Passwords did not match.' });
              break;
            default:
          }
        })
        .catch(error => this.setState({ error }));
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    if (name === 'password') {
      this.setState(state => ({
        error: state.password.length < 8 ? 'Passwords is too short' : '',
      }));
    }
    if (name === 'repeat') {
      this.setState(state => ({
        error: state.password === state.repeat ? '' : 'Passwords do not match',
      }));
    }
  }

  render() {
    const {
      email, password, repeat, error,
    } = this.state;
    return (
      <div className="background">
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <img src={Logo} alt="logo" className="logo" />
          <i className="fas fa-envelope" />
          <i className="fas fa-lock" />
          <i className="fas fa-lock repeat" />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="repeat"
            value={repeat}
            placeholder="Repeat password"
            onChange={this.handleChange}
            required
          />
          {error === '' ? '' : <p className="invalid">{error}</p>}
          <button type="submit">Sign Up</button>
          <Link className="link" to="/">Already have an account?</Link>
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  createSession: PropTypes.func.isRequired,
  session: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = dispatch => ({
  createSession: user => dispatch(createSession(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupForm));
