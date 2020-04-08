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
  day, month, year,
}) => (
  <div>
    <i className="fas fa-birthday-cake" />
    {`${months[month]} ${day}, ${year}`}
  </div>
);

HumanDate.propTypes = {
  month: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

export default HumanDate;
