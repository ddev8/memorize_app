import * as fromCheckAuth from './check-auth.actions';

describe('loadCheckAuths', () => {
  it('should return an action', () => {
    expect(fromCheckAuth.loadCheckAuth().type).toBe('[CheckAuth] Load CheckAuth');
  });
});
