import { AuthReducer, initialState } from './auth.reducer';

describe('Auth Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = AuthReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
