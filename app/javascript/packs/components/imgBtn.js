import React from 'react';
import PropTypes from 'prop-types';

const ImgBtn = ({
  source, id, onClick, classBtn, classImg,
}) => (
  <button
    type="button"
    className={classBtn}
    id={id}
    onClick={onClick}
  >
    <img
      src={source}
      className={classImg}
      alt="Icon"
    />
  </button>
);

ImgBtn.propTypes = {
  source: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  classBtn: PropTypes.string,
  classImg: PropTypes.string,
};

ImgBtn.defaultProps = {
  classBtn: 'img-btn-selector',
  classImg: 'lookIcon',
};

export default ImgBtn;
