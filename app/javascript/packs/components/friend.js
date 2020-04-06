import React from 'react';
import PropTypes from 'prop-types';

const Friend = ({
  source, name, text, icon, onClick,
}) => (
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
);

Friend.propTypes = {
  source: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Friend.defaultProps = {
  icon: 'fas fa-user-plus',
};

export default Friend;
