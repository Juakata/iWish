const CREATE_SESSION = 'CREATE_SESSION';
const DESTROY_SESSION = 'DESTROY_SESSION';

const sessionReducer = (state = '', action) => {
  switch (action.type) {
    case CREATE_SESSION:
      return action.user;
    case DESTROY_SESSION:
      return '';
    default:
      return state;
  }
};

export default sessionReducer;
