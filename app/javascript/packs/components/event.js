import React from 'react';
import PropTypes from 'prop-types';

const Event = ({
  currentEvent, date, my, all, seeItems, assistEvent,
}) => {
  let btns;
  if (my) {
    btns = (
      <div>
        <button type="button" onClick={seeItems}>See Items</button>
        <button type="button">Delete</button>
      </div>
    );
  } else if (all) {
    btns = (
      <div>
        <button onClick={assistEvent} type="button">Assist</button>
      </div>
    );
  } else {
    btns = (
      <div>
        <button type="button">Forget event</button>
        <button type="button">See Items</button>
      </div>
    );
  }
  return (
    <article className="event-cont">
      <div className="center-pic-h4">
        <img src={currentEvent.profile.picture} alt="Imgperson" />
        <h4>{currentEvent.profile.name}</h4>
      </div>
      <div className="center-hs">
        <h2>{currentEvent.title}</h2>
        <h3>{date}</h3>
        {btns}
      </div>
      <div className="people-count-i">
        <i className="fas fa-users" />
        <span>{currentEvent.people.length}</span>
      </div>
    </article>
  );
};

Event.propTypes = {
  currentEvent: PropTypes.instanceOf(Object).isRequired,
  date: PropTypes.instanceOf(Object).isRequired,
  my: PropTypes.bool,
  all: PropTypes.bool,
  seeItems: PropTypes.func,
  assistEvent: PropTypes.func,
};

Event.defaultProps = {
  my: false,
  all: false,
  seeItems: () => {},
  assistEvent: () => {},
};

export default Event;
