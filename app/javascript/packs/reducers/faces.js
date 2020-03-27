const GET_FACES = 'GET_FACES';

const facesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_FACES:
      return action.faces;
    default:
      return state;
  }
};

export default facesReducer;
