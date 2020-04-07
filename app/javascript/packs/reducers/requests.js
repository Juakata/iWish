const CREATE_REQUESTS = 'CREATE_REQUESTS';
const ADD_SENT = 'ADD_SENT';
const ADD_NEW = 'ADD_NEW';
const REMOVE_SENT = 'REMOVE_SENT';
const REMOVE_NEW = 'REMOVE_NEW';
const REMOVE_RECEIVED = 'REMOVE_RECEIVED';
const ADD_FRIEND = 'ADD_FRIEND';
const REMOVE_FRIEND = 'REMOVE_FRIEND';

const initial = {
  friends: [],
  received: [],
  newRequests: [],
  sent: [],
};

const requestsReducer = (state = initial, action) => {
  const {
    friends, received, newRequests, sent,
  } = state;
  switch (action.type) {
    case CREATE_REQUESTS:
      return {
        friends: action.friends,
        received: action.received,
        newRequests: action.newRequests,
        sent: action.sent,
      };
    case ADD_SENT:
      sent.push(action.sent);
      return {
        friends, received, newRequests, sent,
      };
    case ADD_NEW:
      newRequests.push(action.newRequest);
      return {
        friends, received, newRequests, sent,
      };
    case ADD_FRIEND:
      friends.push(action.friend);
      return {
        friends, received, newRequests, sent,
      };
    case REMOVE_FRIEND:
      return {
        friends: friends.filter(ele => ele.id !== action.id),
        received,
        newRequests,
        sent,
      };
    case REMOVE_SENT:
      return {
        friends,
        received,
        newRequests,
        sent: sent.filter(ele => ele.id !== action.id),
      };
    case REMOVE_NEW:
      return {
        friends,
        received,
        newRequests: newRequests.filter(ele => ele.id !== action.id),
        sent,
      };
    case REMOVE_RECEIVED:
      return {
        friends,
        received: received.filter(ele => ele.id !== action.id),
        newRequests,
        sent,
      };
    default:
      return state;
  }
};

export default requestsReducer;
