import { MemorizeItem } from '../../shared/models/memorize.model';
import * as fromDeleteMemorizeItem from './delete-memorize-item.actions';

describe('DeleteMemorizeItem', () => {
  it('should return an action', () => {
    expect(
      fromDeleteMemorizeItem.deleteMemorizeItem({
        item: new MemorizeItem({
          id: '',
          uid: '',
          date: '',
          description: '',
          progress: 10,
          reminderDate: '',
          text: '',
        }),
      }).type
    ).toBe('[DeleteMemorizeItem] DeleteMemorizeItem');
  });
});
