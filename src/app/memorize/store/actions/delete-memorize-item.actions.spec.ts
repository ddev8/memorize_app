import * as fromDeleteMemorizeItem from './delete-memorize-item.actions';

describe('DeleteMemorizeItems', () => {
  it('should return an action', () => {
    expect(fromDeleteMemorizeItem.DeleteMemorizeItems().type).toBe('[DeleteMemorizeItem]  DeleteMemorizeItems');
  });
});
