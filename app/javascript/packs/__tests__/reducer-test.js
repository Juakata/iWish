import reducer from '../reducers/index';

const CREATE_SESSION = 'CREATE_SESSION';
const DESTROY_SESSION = 'DESTROY_SESSION';

describe('reducer', () => {
  it('should handle CREATE_SESSION', () => {
    expect(
      reducer({ session: '' }, {
        type: CREATE_SESSION,
        user: 'andoni@gmail.com',
      }),
    ).toEqual({ session: 'andoni@gmail.com' });
  });

  it('should handle DESTROY_SESSION', () => {
    expect(
      reducer({ session: 'andoni@gmail.com' }, {
        type: DESTROY_SESSION,
      }),
    ).toEqual({ session: '' });
  });
});
