import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({
  source, out, menu,
}) => (
  <header>
    <button
      type="button"
      id="menu-cover"
      onClick={menu}
      aria-label="Out"
    />
    <ul id="ul-home">
      <li>
        <Link className="link link-home" to="/home">
          <img src={source} alt="logo" className="logoHome" />
        </Link>
        <button type="button" className="home-btn" onClick={menu}>
          <img src={source} alt="logo" className="logoHome" />
        </button>
      </li>
    </ul>
    <ul className="hide-ul">
      <li className="hide-li">
        <Link className="link" to="/home">
          <button type="button" onClick={menu}>
            <i className="fas fa-home i-header" />
            <p>Home</p>
          </button>
        </Link>
      </li>
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
        <Link className="link" to="/friends">
          <div>
            <i className="fas fa-user-friends i-header" />
            <p>Friends</p>
          </div>
        </Link>
      </li>
    </ul>
    <ul className="hide">
      <li className="hide-li">
        <Link className="link" to="/home">
          <button type="button" onClick={menu}>
            <i className="fas fa-home i-header" />
            <p>Home</p>
          </button>
        </Link>
      </li>
      <li>
        <Link className="link" to="/profile">
          <button type="button" onClick={menu}>
            <i className="fas fa-user i-header" />
            <p>Profile</p>
          </button>
        </Link>
      </li>
      <li>
        <Link className="link" to="/events">
          <button type="button" onClick={menu}>
            <i className="fas fa-calendar-alt i-header" />
            <p>Events</p>
          </button>
        </Link>
      </li>
      <li>
        <Link className="link" to="/friends">
          <button type="button" onClick={menu}>
            <i className="fas fa-user-friends i-header" />
            <p>Friends</p>
          </button>
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
  menu: PropTypes.func.isRequired,
};

export default Header;
