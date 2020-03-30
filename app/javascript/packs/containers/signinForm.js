import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Fingerprint2 from 'fingerprintjs2';
import Logo from '../assets/logo.png';
import { createSession } from '../actions/index';

class SigninForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
    const { email, password, key } = this.state;
    const { history, createSession } = this.props;
    axios.get(`v1/signin?email=${email}&password=${password}&key=${key}`)
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
  session: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = dispatch => ({
  createSession: user => dispatch(createSession(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SigninForm));
