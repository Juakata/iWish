import React from 'react';
import PropTypes from 'prop-types';

const months = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  10: 'Octover',
  11: 'November',
  12: 'December',
};

const HumanDate = ({
  date, time,
}) => {
  const month = date.split('-')[1];
  const day = date.split('-')[2];
  const year = date.split('-')[0];
  let hour = time.split(':')[0];
  const minutes = time.split(':')[1];
  let final = 'AM';
  if (hour - 12 > 0) {
    final = 'PM';
    hour -= 12;
  } else if (hour - 12 === 0) {
    final = 'PM';
  } else if (hour - 12 === -12) {
    hour = 12;
  }
  return (
    <div className="margin-bottom">
      {hour === '-1' ? (
        <div>
          <i className="fas fa-birthday-cake" />
          {`${months[month]} ${day}, ${year}`}
        </div>
      ) : (
        <div>
          {`${months[month]} ${day}, ${year} ${hour}:${minutes} ${final}`}
        </div>
      )}
    </div>
  );
};

HumanDate.propTypes = {
  date: PropTypes.string.isRequired,
  time: PropTypes.string,
};

HumanDate.defaultProps = {
  time: '-1:-1',
};

export default HumanDate;
