import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/logo.png';
import { createSession } from '../actions/index';

class SigninForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  componentDidMount() {
    const decodedCookie = decodeURIComponent(document.cookie);
    const { history, createSession } = this.props;
    if (decodedCookie !== '') {
      const ca = decodedCookie.split(';');
      const id = ca[0].split('=')[1];
      const token = ca[1].split('=')[1];
      axios.get(`v1/autosignin?id=${id}&token=${token}`)
        .then(response => {
          if (response.data.email) {
            createSession(response.data.email);
            history.push('/home');
          }
        })
        .catch(error => this.setState({ error }));
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const { history, createSession } = this.props;
    axios.get(`v1/signin?email=${email}&password=${password}`)
      .then(response => {
        if (response.data.email) {
          createSession(response.data.email);
          history.push('/home');
        } else {
          this.setState({ error: response.data.result });
        }
      })
      .catch(error => this.setState({ error }));
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, password, error } = this.state;
    return (
      <div className="background">
        <form className="sign-in-form" onSubmit={this.handleSubmit}>
          <img src={Logo} alt="logo" className="logo" />
          <i className="fas fa-envelope" />
          <i className="fas fa-lock" />
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
          {error === '' ? '' : <p className="invalid">{error}</p>}
          <button type="submit">Sign In</button>
          <Link className="link" to="/signup">Or create a new account!</Link>
        </form>
      </div>
    );
  }
}

SigninForm.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  createSession: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  createSession: user => dispatch(createSession(user)),
});

export default withRouter(connect(null, mapDispatchToProps)(SigninForm));
