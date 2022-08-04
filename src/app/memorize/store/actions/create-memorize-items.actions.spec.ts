import * as fromCreateMemorizeItems from './create-memorize-items.actions';

describe('CreateMemorizeItem', () => {
  it('should return an action', () => {
    expect(fromCreateMemorizeItems.createMemorizeItem({ item: { text: '', description: '' } }).type).toBe(
      '[CreateMemorizeItem] CreateMemorizeItem'
    );
  });
});
