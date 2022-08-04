import * as fromLoadItems from './load-memorize-items.actions';

describe('loadLoadItems', () => {
  it('should return an action', () => {
    expect(fromLoadItems.loadItems().type).toBe('[LoadItems] Load Items');
  });
});
