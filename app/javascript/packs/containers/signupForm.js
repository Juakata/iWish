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
          if (response.data.result) {
            history.push('/home');
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
  }

  render() {
    const {
      email, password, repeat, error,
    } = this.state;
    const equal = password === repeat;
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
        {equal ? '' : <div className="invalid">Passwords do not match.</div>}
        {error === '' ? '' : <p>{error}</p>}
        <button type="submit">Sign Up</button>
        <Link className="link" to="/">Already have an account?</Link>
      </form>
    );
  }
}

SignupForm.propTypes = {
  history: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withRouter(connect(null, null)(SignupForm));
