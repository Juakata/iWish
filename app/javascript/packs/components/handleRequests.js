import React from 'react';
import PropTypes from 'prop-types';

const HandleRequests = ({
  backwardAction, furtherAction,
}) => (
  <div className="request-cont">
    <button onClick={backwardAction} type="button">
      <i className="fas fa-step-backward" />
    </button>
    <button onClick={furtherAction} type="button">
      <i className="fas fa-step-forward" />
    </button>
  </div>
);

HandleRequests.propTypes = {
  backwardAction: PropTypes.func.isRequired,
  furtherAction: PropTypes.func.isRequired,
};

export default HandleRequests;
