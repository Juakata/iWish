const ADD_WISHESGIVERS = 'ADD_WISHESGIVERS';
const ADD_GIVER = 'ADD_GIVER';
const REMOVE_GIVER = 'REMOVE_GIVER';

const wishesgiversReducer = (state = [], action) => {
  const clone = [...state];
  let wishgivers; let index; let index2; let givers;
  const { profile, wish, giver } = action;
  switch (action.type) {
    case ADD_WISHESGIVERS:
      clone.push(action.wishesgivers);
      return clone;
    case ADD_GIVER:
      wishgivers = clone.filter(e => e.id === profile);
      index = clone.findIndex(e => e.id === profile);
      index2 = wishgivers[0].wishgivers.findIndex(e => e.id === wish);
      clone[index].wishgivers[index2].givers.push(giver);
      return clone;
    case REMOVE_GIVER:
      wishgivers = clone.filter(e => e.id === profile);
      index = clone.findIndex(e => e.id === profile);
      givers = wishgivers[0].wishgivers.filter(e => e.id === wish);
      givers = givers[0].givers.filter(e => e.id !== giver);
      index2 = wishgivers[0].wishgivers.findIndex(e => e.id === wish);
      clone[index].wishgivers[index2].givers = givers;
      return clone;
    default:
      return state;
  }
};

export default wishesgiversReducer;
