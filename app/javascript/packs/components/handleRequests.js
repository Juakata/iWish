import React from 'react';
import PropTypes from 'prop-types';

const HandleRequests = ({
  backwardAction, text, text2, change,
}) => (
  <button
    id="btn-backR"
    onClick={backwardAction}
    type="button"
    className="requests-container"
  >
    {!change && (
    <div className="h2request-cont">
      <h2 id="h2R1">{text}</h2>
      <h2 id="h2R2">{text2}</h2>
      <i className="fas fa-arrow-circle-left" />
    </div>
    )}
    {change && (
    <div className="h2request-cont">
      <h2 id="h2R2">{text2}</h2>
      <h2 id="h2R1">{text}</h2>
      <i className="fas fa-arrow-circle-left" />
    </div>
    )}
  </button>
);

HandleRequests.propTypes = {
  backwardAction: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired,
  change: PropTypes.bool.isRequired,
};

export default HandleRequests;
