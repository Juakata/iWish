const CREATE_PROFILE = 'CREATE_PROFILE';

const createProfile = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PROFILE:
      return action.profile;
    default:
      return state;
  }
};

export default createProfile;
