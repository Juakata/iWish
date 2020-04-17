const ADD_MYEVENTS = 'ADD_MYEVENTS';
const ADD_ALLEVENTS = 'ADD_ALLEVENTS';
const CREATE_EVENTS = 'CREATE_EVENTS';
const CREATE_ALLEVENTS = 'CREATE_ALLEVENTS';
const initial = { myevents: [], allevents: [] };

const eventsReducer = (state = initial, action) => {
  const clone = { ...state };
  switch (action.type) {
    case CREATE_EVENTS:
      clone.myevents = action.myevents;
      return clone;
    case CREATE_ALLEVENTS:
      clone.allevents = action.allevents;
      return clone;
    case ADD_MYEVENTS:
      clone.myevents.push(action.event);
      return clone;
    case ADD_ALLEVENTS:
      clone.allevents.push(action.event);
      return clone;
    default:
      return state;
  }
};

export default eventsReducer;
