import * as actions from '../actions/index';

const CREATE_SESSION = 'CREATE_SESSION';
const DESTROY_SESSION = 'DESTROY_SESSION';

describe('actions', () => {
  it('should create an action to create a session', () => {
    const user = 'user@gmail.com';
    const expectedAction = {
      type: CREATE_SESSION,
      user,
    };
    expect(actions.createSession(user)).toEqual(expectedAction);
  });

  it('should destroy the session', () => {
    const expectedAction = {
      type: DESTROY_SESSION,
    };
    expect(actions.destroySession()).toEqual(expectedAction);
  });
});
