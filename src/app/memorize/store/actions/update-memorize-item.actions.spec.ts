import { MemorizeItem } from '../../shared/models/memorize.model';
import * as fromUpdateMemorizeItem from './update-memorize-item.actions';

describe('UpdateMemorizeItem', () => {
  it('should return an action', () => {
    expect(
      fromUpdateMemorizeItem.updateMemorizeItem({
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
    ).toBe('[UpdateMemorizeItem] UpdateMemorizeItem');
  });
});
