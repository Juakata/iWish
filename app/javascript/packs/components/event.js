import React from 'react';
import PropTypes from 'prop-types';

const Event = ({
  currentEvent, date,
}) => (
  <article className="event-cont">
    <img src={currentEvent.profile.picture} alt="Imgperson" />
    <div>
      <h2>{currentEvent.title}</h2>
      <h3>{date}</h3>
    </div>
    <div className="people-count-i">
      <i className="fas fa-users" />
      <span>{currentEvent.people.length}</span>
    </div>
  </article>
);

Event.propTypes = {
  currentEvent: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
};

export default Event;
