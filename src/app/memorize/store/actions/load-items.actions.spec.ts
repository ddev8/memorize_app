import * as fromLoadItems from './load-items.actions';

describe('loadLoadItemss', () => {
  it('should return an action', () => {
    expect(fromLoadItems.loadLoadItemss().type).toBe('[LoadItems] Load LoadItemss');
  });
});
