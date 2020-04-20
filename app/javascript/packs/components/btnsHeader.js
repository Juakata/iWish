import React from 'react';
import PropTypes from 'prop-types';

const BtnsHeader = ({
  handleMyFriends, handleNewFriends,
}) => (
  <div className="btn-friends-cont">
    <button
      className="btn-friends-left"
      type="button"
      onClick={handleMyFriends}
    >
      New Friends
    </button>
    <button
      className="btn-friends-right"
      type="button"
      onClick={handleNewFriends}
    >
      My Friends
    </button>
  </div>
);

BtnsHeader.propTypes = {
  handleMyFriends: PropTypes.func.isRequired,
  handleNewFriends: PropTypes.func.isRequired,
};

export default BtnsHeader;
