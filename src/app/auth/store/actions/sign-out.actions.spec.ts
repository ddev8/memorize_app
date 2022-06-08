import * as fromSignOut from './sign-out.actions';

describe('loadSignOuts', () => {
  it('should return an action', () => {
    expect(fromSignOut.loadSignOuts().type).toBe('[SignOut] Load SignOut');
  });
});
