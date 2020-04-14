import React from 'react';
import PropTypes from 'prop-types';

const MenuEvents = ({
  myEvents, createEvent, comingEvents,
}) => (
  <div className="events-menu">
    <button id="btn-myEvents" onClick={myEvents} type="button">My events</button>
    <button id="btn-createEvent" onClick={createEvent} type="button">Create</button>
    <button id="btn-comingEvents" onClick={comingEvents} type="button">Coming soon</button>
  </div>
);

MenuEvents.propTypes = {
  myEvents: PropTypes.func.isRequired,
  createEvent: PropTypes.func.isRequired,
  comingEvents: PropTypes.func.isRequired,
};

export default MenuEvents;
