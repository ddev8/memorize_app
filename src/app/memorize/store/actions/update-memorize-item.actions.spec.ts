import * as fromUpdateMemorizeItem from './update-memorize-item.actions';

describe('UpdateMemorizeItems', () => {
  it('should return an action', () => {
    expect(fromUpdateMemorizeItem.UpdateMemorizeItems().type).toBe('[UpdateMemorizeItem]  UpdateMemorizeItems');
  });
});
