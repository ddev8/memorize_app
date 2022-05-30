import * as fromLoadItems from './load-memorize-items.actions';

describe('loadLoadItemss', () => {
  it('should return an action', () => {
    expect(fromLoadItems.loadItems().type).toBe('[LoadItems] Load LoadItemss');
  });
});
