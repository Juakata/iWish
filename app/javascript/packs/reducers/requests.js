const CREATE_REQUESTS = 'CREATE_REQUESTS';

const requestsReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REQUESTS:
      return {
        received: action.received,
        newRequests: action.newRequests,
        sent: action.sent,
      };
    default:
      return state;
  }
};

export default requestsReducer;
