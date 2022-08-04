import * as fromSignInWithGoogle from './sign-in-with-google.actions';

describe('loadSignInWithGoogles', () => {
  it('should return an action', () => {
    expect(fromSignInWithGoogle.loadSignInWithGoogle().type).toBe('[SignInWithGoogle] Load SignInWithGoogle');
  });
});
