const CREATE_PROFILE = 'CREATE_PROFILE';
const ADD_WISH = 'ADD_WISH';
const UPDATE_WISH = 'UPDATE_WISH';
const DELETE_WISH = 'DELETE_WISH';

const createProfile = (state = [], action) => {
  switch (action.type) {
    case CREATE_PROFILE:
      return action.profile;
    case ADD_WISH:
      return Object.create(state).wishes.push(action.wish);
    case UPDATE_WISH:
      return [
        ...state.slice(0, action.wish.id),
        action.wish,
        ...state.slice(action.wish.id + 1, action.length),
      ];
    case DELETE_WISH:
      return state.filter(wish => wish.id !== action.id);
    default:
      return state;
  }
};

export default createProfile;
