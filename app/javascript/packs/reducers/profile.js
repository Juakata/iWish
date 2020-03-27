const CREATE_PROFILE = 'CREATE_PROFILE';
const ADD_WISH = 'ADD_WISH';

const createProfile = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PROFILE:
      return action.profile;
    case ADD_WISH:
      return Object.create(state).wishes.push(action.wish);
    default:
      return state;
  }
};

export default createProfile;
