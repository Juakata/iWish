const ADD_WISHESGIVERS = 'ADD_WISHESGIVERS';
const ADD_GIVER = 'ADD_GIVER';

const wishesgiversReducer = (state = [], action) => {
  const clone = [...state];
  switch (action.type) {
    case ADD_WISHESGIVERS:
      clone.push(action.wishesgivers);
      return clone;
    case ADD_GIVER:
      clone.push(action.giver);
      return clone;
    default:
      return state;
  }
};

export default wishesgiversReducer;
