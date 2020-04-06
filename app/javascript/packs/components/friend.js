import React from 'react';
import PropTypes from 'prop-types';

const Friend = ({
  source, name, text, icon,
}) => (
  <div className="request-cont">
    <img src={source} alt="user" />
    <section>
      <h2>{name}</h2>
      <div>
        <button type="button">
          <i className={icon} />
          {text}
        </button>
      </div>
    </section>
  </div>
);

Friend.propTypes = {
  source: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Friend.defaultProps = {
  icon: 'fas fa-user-plus',
};

export default Friend;
