import React from 'react';
import PropTypes from 'prop-types';

const Wish = ({
  classBtn, id, onClick, title, description,
}) => (
  <button
    type="button"
    className={classBtn}
    id={id}
    onClick={onClick}
  >
    <h2>{title}</h2>
    <p>{description}</p>
  </button>
);

Wish.propTypes = {
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  classBtn: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

Wish.defaultProps = {
  classBtn: 'btn-wish',
};

export default Wish;
