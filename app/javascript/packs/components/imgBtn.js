import React from 'react';
import PropTypes from 'prop-types';

const ImgBtn = ({
  source, id, onClick, className,
}) => (
  <button
    type="button"
    className={className}
    id={id}
    onClick={onClick}
  >
    <img
      src={source}
      className="lookIcon"
      alt="Icon"
    />
  </button>
);

ImgBtn.propTypes = {
  source: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ImgBtn.defaultProps = {
  className: 'img-btn-selector',
};

export default ImgBtn;
