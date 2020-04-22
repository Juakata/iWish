const CREATE_MYEVENTS = 'CREATE_MYEVENTS';
const CREATE_ALLEVENTS = 'CREATE_ALLEVENTS';
const CREATE_COMINGEVENTS = 'CREATE_COMINGEVENTS';
const ADD_MYEVENT = 'ADD_MYEVENT';
const ADD_ALLEVENT = 'ADD_ALLEVENT';
const ADD_COMINGEVENT = 'ADD_COMINGEVENT';
const REMOVE_ALLEVENT = 'REMOVE_ALLEVENT';
const initial = { myevents: [], allevents: [], comingevents: [] };

const eventsReducer = (state = initial, action) => {
  const clone = { ...state };
  let allevents;
  switch (action.type) {
    case CREATE_MYEVENTS:
      clone.myevents = action.myevents;
      return clone;
    case CREATE_ALLEVENTS:
      clone.allevents = action.allevents;
      return clone;
    case CREATE_COMINGEVENTS:
      clone.comingevents = action.comingevents;
      return clone;
    case ADD_MYEVENT:
      clone.myevents.push(action.event);
      return clone;
    case ADD_ALLEVENT:
      clone.allevents.unshift(action.event);
      return clone;
    case ADD_COMINGEVENT:
      clone.comingevents.unshift(action.event);
      clone.comingevents[0].people.push(action.profile);
      return clone;
    case REMOVE_ALLEVENT:
      allevents = clone.allevents.filter(e => e.id !== action.id);
      clone.allevents = allevents;
      return clone;
    default:
      return state;
  }
};

export default eventsReducer;
