import * as fromCreateMemorizeItems from './create-memorize-items.actions';

describe('CreateMemorizeItemss', () => {
  it('should return an action', () => {
    expect(fromCreateMemorizeItems.CreateMemorizeItemss().type).toBe('[CreateMemorizeItems]  CreateMemorizeItemss');
  });
});
