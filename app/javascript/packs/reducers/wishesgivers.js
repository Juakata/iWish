const ADD_WISHESGIVERS = 'ADD_WISHESGIVERS';
const ADD_GIVER = 'ADD_GIVER';
const REMOVE_GIVER = 'REMOVE_GIVER';

const wishesgiversReducer = (state = [], action) => {
  const clone = [...state];
  let wishgivers; let index; let index2; let givers;
  switch (action.type) {
    case ADD_WISHESGIVERS:
      clone.push(action.wishesgivers);
      return clone;
    case ADD_GIVER:
      wishgivers = clone.filter(e => e.id === action.profile)[0].wishgivers;
      index = clone.findIndex(e => e.id === action.profile);
      index2 = wishgivers.findIndex(e => e.id === action.wish);
      clone[index].wishgivers[index2].givers.push(action.giver);
      return clone;
    case REMOVE_GIVER:
      wishgivers = clone.filter(e => e.id === action.profile)[0].wishgivers;
      index = clone.findIndex(e => e.id === action.profile);
      givers = wishgivers.filter(e => e.id === action.wish)[0].givers;
      givers = givers.filter(e => e.id !== action.giver);
      index2 = wishgivers.findIndex(e => e.id === action.wish);
      clone[index].wishgivers[index2].givers = givers;
      return clone;
    default:
      return state;
  }
};

export default wishesgiversReducer;
