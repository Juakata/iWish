import React from 'react';
import PropTypes from 'prop-types';

const Event = ({
  currentEvent, date, my, all,
}) => {
  let btns;
  if (my) {
    btns = (
      <div>
        <button type="button">See Items</button>
        <button type="button">Delete</button>
      </div>
    );
  } else if (all) {
    btns = (
      <div>
        <button type="button">Assist</button>
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
      <img src={currentEvent.profile.picture} alt="Imgperson" />
      <div>
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
};

Event.defaultProps = {
  my: false,
  all: false,
};

export default Event;
