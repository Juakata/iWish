import React from 'react';
import PropTypes from 'prop-types';

const ShowFriend = ({
  name, goBack, source, birthday, wishesgivers, showGivers,
}) => {
  const renderWishes = wishesgivers.wishes.map(wish => {
    const wishGivers = wishesgivers.wishgivers.filter(wishGivers => wishGivers.id === wish.id);
    return (
      <button
        id={wish.id}
        onClick={showGivers.bind(this, {
          profile: wish.profile_id,
          wish: wish.id,
        })}
        className="btn-wish"
        type="button"
        key={wish.id}
      >
        <span>
          <i className="fas fa-users" />
          {wishGivers[0].givers.length}
        </span>
        <h2>{wish.title}</h2>
        <p>{wish.description}</p>
      </button>
    );
  });

  return (
    <div className="container remove-padding">
      <button id="btn-back" type="button" onClick={goBack}>
        Go Back!
        <i className="fas fa-hand-point-left" />
      </button>
      <section className="show-friend-cont">
        <img src={source} alt="friend" />
        <h2>{name}</h2>
        {birthday}
        <div className="cont-wishes">
          {renderWishes}
        </div>
      </section>
    </div>
  );
};

ShowFriend.propTypes = {
  name: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
  source: PropTypes.string.isRequired,
  birthday: PropTypes.instanceOf(Object).isRequired,
  wishesgivers: PropTypes.instanceOf(Object).isRequired,
  showGivers: PropTypes.func.isRequired,
};

export default ShowFriend;
