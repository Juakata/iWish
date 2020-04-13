import React from 'react';
import PropTypes from 'prop-types';

const Message = ({
  text, className,
}) => (
  <p className={className}>
    {text}
  </p>
);

Message.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Message.defaultProps = {
  className: 'p-message-ok',
};

export default Message;
