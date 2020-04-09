const ADD_WISHESGIVERS = 'ADD_WISHESGIVERS';

const wishesgiversReducer = (state = [], action) => {
  const clone = [...state];
  switch (action.type) {
    case ADD_WISHESGIVERS:
      clone.push(action.wishesgivers);
      return clone;
    default:
      return state;
  }
};

export default wishesgiversReducer;
