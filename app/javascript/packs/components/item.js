import React from 'react';
import PropTypes from 'prop-types';

const Item = ({
  item, coming, addMe, className, seeItemGuests, closeGuestsView,
}) => {
  const divId = `${item.id}-guests`;
  const renderPeople = item.people.map(person => (
    <div className="item-person-cont" key={person.id}>
      <img src={person.picture} alt="person.pic" />
      <h2>{person.name}</h2>
    </div>
  ));
  return (
    <div>
      <div className="item-cont">
        <span>{item.title}</span>
        {coming && (
          <button
            type="button"
            onClick={addMe}
            className={className}
          >
            <i className="fas fa-plus-circle" />
          </button>
        )}
        <button
          onClick={seeItemGuests.bind(this, divId)}
          className="btn-item-people"
          type="button"
        >
          <i className="fas fa-users" />
          <span>{item.people.length}</span>
        </button>
      </div>
      <div id={divId} className="guests-item-cont">
        <div className="guests-item-sub-cont">
          <button
            type="button"
            className="btn-close"
            onClick={closeGuestsView.bind(this, divId)}
          >
            Close
          </button>
          {renderPeople}
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  coming: PropTypes.bool,
  addMe: PropTypes.func,
  className: PropTypes.string,
  seeItemGuests: PropTypes.func.isRequired,
  closeGuestsView: PropTypes.func.isRequired,
};

Item.defaultProps = {
  coming: false,
  addMe: () => {},
  className: 'btn-add-guest',
};

export default Item;
