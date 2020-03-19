import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ source, out }) => (
  <header>
    <ul id="ul-home">
      <li>
        <Link className="link" to="/home">
          <img src={source} alt="logo" className="logoHome" />
        </Link>
      </li>
    </ul>
    <ul>
      <li>
        <Link className="link" to="/profile">
          <div>
            <i className="fas fa-user i-header" />
            <p>Profile</p>
          </div>
        </Link>
      </li>
      <li>
        <Link className="link" to="/events">
          <div>
            <i className="fas fa-calendar-alt i-header" />
            <p>Events</p>
          </div>
        </Link>
      </li>
      <li>
        <Link className="link" to="/groups">
          <div>
            <i className="fas fa-users i-header" />
            <p>Groups</p>
          </div>
        </Link>
      </li>
      <li>
        <Link className="link" to="/friends">
          <div>
            <i className="fas fa-user-friends i-header" />
            <p>Friends</p>
          </div>
        </Link>
      </li>
    </ul>
    <ul id="ul-signout">
      <li>
        <button type="button" className="link btn-out" onClick={out}>
          <i className="fas fa-sign-out-alt i-header" />
          <p>Sign Out</p>
        </button>
      </li>
    </ul>
  </header>
);

Header.propTypes = {
  source: PropTypes.string.isRequired,
  out: PropTypes.func.isRequired,
};

export default Header;
