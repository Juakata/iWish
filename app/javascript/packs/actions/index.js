const CREATE_SESSION = 'CREATE_SESSION';
const DESTROY_SESSION = 'DESTROY_SESSION';

const createSession = user => ({
  type: CREATE_SESSION,
  user,
});

const destroySession = () => ({
  type: DESTROY_SESSION,
});

export { createSession, destroySession };
