import React from 'react';
import PropTypes from 'prop-types';

const Item = ({
  item,
}) => (
  <div className="item-cont">
    <span>{item.title}</span>
    <button className="btn-item-people" type="button">
      <i className="fas fa-users" />
      <span>0</span>
    </button>
  </div>
);

Item.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
};

export default Item;
