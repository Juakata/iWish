import React from 'react';
import PropTypes from 'prop-types';

const Item = ({
  item, coming, addMe, className,
}) => (
  <div className="item-cont">
    <span>{item.title}</span>
    {coming && (
      <button onClick={addMe} className={className} type="button">
        <i className="fas fa-plus-circle" />
      </button>
    )}
    <button className="btn-item-people" type="button">
      <i className="fas fa-users" />
      <span>{item.people.length}</span>
    </button>
  </div>
);

Item.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  coming: PropTypes.bool,
  addMe: PropTypes.func,
  className: PropTypes.string,
};

Item.defaultProps = {
  coming: false,
  addMe: () => {},
  className: 'btn-add-guest',
};

export default Item;
