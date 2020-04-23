const CREATE_MYEVENTS = 'CREATE_MYEVENTS';
const CREATE_ALLEVENTS = 'CREATE_ALLEVENTS';
const CREATE_COMINGEVENTS = 'CREATE_COMINGEVENTS';
const ADD_MYEVENT = 'ADD_MYEVENT';
const ADD_ALLEVENT = 'ADD_ALLEVENT';
const ADD_COMINGEVENT = 'ADD_COMINGEVENT';
const REMOVE_ALLEVENT = 'REMOVE_ALLEVENT';
const REMOVE_COMINGEVENT = 'REMOVE_COMINGEVENT';
const REMOVE_MYEVENT = 'REMOVE_MYEVENT';
const ADD_GUEST_ITEM = 'ADD_GUEST_ITEM';
const REMOVE_GUEST_ITEM = 'REMOVE_GUEST_ITEM';
const initial = { myevents: [], allevents: [], comingevents: [] };

const eventsReducer = (state = initial, action) => {
  const clone = { ...state };
  let allevents; let comingevents; let myevents;
  let people; let found; const items = []; let itemClone;
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
    case REMOVE_MYEVENT:
      myevents = clone.myevents.filter(e => e.id !== action.id);
      clone.myevents = myevents;
      return clone;
    case REMOVE_ALLEVENT:
      allevents = clone.allevents.filter(e => e.id !== action.id);
      clone.allevents = allevents;
      return clone;
    case REMOVE_COMINGEVENT:
      comingevents = clone.comingevents.filter(e => e.id !== action.id);
      clone.comingevents = comingevents;
      return clone;
    case ADD_GUEST_ITEM:
      people = clone.comingevents[action.coming].items[action.item].people;
      found = people.filter(e => e.id !== action.profile.id);
      if (people.length === found.length) {
        people.push(action.profile);
      } else {
        clone.comingevents[action.coming].items[action.item].people = found;
      }
      return clone;
    case REMOVE_GUEST_ITEM:
      clone.comingevents[action.coming].items.forEach(item => {
        itemClone = item;
        itemClone.people = item.people.filter(person => person.id !== action.id);
        items.push(itemClone);
      });
      clone.comingevents[action.coming].items = items;
      return clone;
    default:
      return state;
  }
};

export default eventsReducer;
