const GET_PROFILE = 'GET_PROFILE';

const facesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return action.profile;
    default:
      return state;
  }
};

export default facesReducer;
