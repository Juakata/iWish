import React from 'react';
import PropTypes from 'prop-types';

const Friend = ({
  source, name, text, icon, onClick, status, profileAction,
}) => (
  <div>
    {status ? (
      <div className="request-cont">
        <button className="no-button" type="button" onClick={profileAction}>
          <img src={source} alt="user" />
        </button>
        <section>
          <button className="no-button" type="button" onClick={profileAction}>
            <h2>{name}</h2>
          </button>
          <div>
            <button id="accept" onClick={onClick} type="button">
              <i className={icon} />
              {text}
            </button>
          </div>
        </section>
      </div>
    ) : (
      <div className="request-cont">
        <img src={source} alt="user" />
        <section>
          <h2>{name}</h2>
          <div>
            <button id="accept" onClick={onClick} type="button">
              <i className={icon} />
              {text}
            </button>
          </div>
        </section>
      </div>
    )}
  </div>
);

Friend.propTypes = {
  source: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  status: PropTypes.bool,
  profileAction: PropTypes.func,
};

Friend.defaultProps = {
  icon: 'fas fa-user-plus',
  status: false,
  profileAction: () => {},
};

export default Friend;
