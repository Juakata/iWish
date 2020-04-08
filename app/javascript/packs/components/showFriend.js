import React from 'react';
import PropTypes from 'prop-types';

const ShowFriend = ({
  name, goBack,
}) => (
  <div className="container remove-padding">
    <button id="btn-back" type="button" onClick={goBack}>
      Go Back!
      <i className="fas fa-hand-point-left" />
    </button>
    <h2>{name}</h2>
  </div>
);

ShowFriend.propTypes = {
  name: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default ShowFriend;
