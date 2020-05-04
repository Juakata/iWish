const ADD_GROUP = 'ADD_GROUP';

const groupsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_GROUP:
      return action.name;
    default:
      return state;
  }
};

export default groupsReducer;
