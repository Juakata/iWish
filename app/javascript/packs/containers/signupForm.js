import React from 'react';
import { connect } from 'react-redux';
import {
  Link, withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Logo from '../assets/logo.png';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      repeat: '',
      error: '',
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { email, password, repeat } = this.state;
    const { history } = this.props;
    if (password === repeat) {
      axios.get(`v1/signup?email=${email}&password_digest=${password}&repeat=${repeat}`)
        .then(response => {
          switch (response.data.result) {
            case 'created':
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
    );
  }
}

SignupForm.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(connect(null, null)(SignupForm));
