const CREATE_PROFILE = 'CREATE_PROFILE';
const ADD_WISH = 'ADD_WISH';
const UPDATE_WISH = 'UPDATE_WISH';
const DELETE_WISH = 'DELETE_WISH';

const profileReducer = (state = {}, action) => {
  const clone = { ...state };
  let wish;
  switch (action.type) {
    case CREATE_PROFILE:
      return action.profile;
    case ADD_WISH:
      clone.wishes.push(action.wish);
      return {};
    case UPDATE_WISH:
      wish = clone.wishes.find(wish => wish.id === action.wish.id);
      wish.title = action.wish.title;
      wish.description = action.wish.description;
      return clone;
    case DELETE_WISH:
      clone.wishes = clone.wishes.filter(wish => wish.id !== action.id);
      return clone;
    default:
      return state;
  }
};

export default profileReducer;
