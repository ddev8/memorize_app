import { MemorizeReducer, initialState } from './memorize.reducer';

describe('Memorize Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = MemorizeReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
