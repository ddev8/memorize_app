import { FirebaseError } from '@firebase/util';
import { BehaviorSubject, of } from 'rxjs';
import { MemorizeItemFromDB } from '../services/memorization.service';

export const USER_UID: string = '9Corylm9Ooc9HDTsaJnEoQ5OkJe2';

export const immutableItem: MemorizeItemFromDB = {
  date: '2021-12-07T08:02:28.707Z',
  description: 'Create description',
  id: 'tLTBqdnNRuGg2xhfHuXd',
  uid: USER_UID,
  progress: 10,
  reminderDate: '2021-12-08T08:02:28.708Z',
  text: 'Create text'
};

export let memorize_list: MemorizeItemFromDB[] = [
  {
    date: '2021-12-07T08:02:28.707Z',
    description: 'Create description',
    id: 'tLTBqdnNRuGg2xhfHuXd',
    progress: 10,
    reminderDate: '2021-12-08T08:02:28.708Z',
    text: 'Create text',
    uid: USER_UID
  }
];
const memorizeList: BehaviorSubject<MemorizeItemFromDB[]> = new BehaviorSubject(memorize_list);

export class AngularFireDatabaseMock {
  collection(query: string): any {
      return {
          valueChanges() {
              return memorizeList;
          },
          doc(id: string) {
            return {
              delete: () => {
                const index: number = memorize_list.findIndex((v: MemorizeItemFromDB) => v.id === id)
                if (index === -1) {
                  throw new FirebaseError('code', 'FireStore error');
                } else {
                  memorize_list.splice(index, 1);
                }
                memorizeList.next([...memorize_list]);
              },
              update: (val: any) => {
                const found_el: MemorizeItemFromDB | undefined = memorize_list.find((v: MemorizeItemFromDB) => v.id === id);
                if (found_el !== undefined) {
                  found_el.date = val.date;
                  found_el.description = val.description;
                  found_el.progress = val.progress;
                  found_el.reminderDate = val.reminderDate;
                  found_el.text = val.text;
                  memorizeList.next([...memorize_list]);
                } else {
                  throw new FirebaseError('code', 'FireStore error');
                }
              },
              set: (val: any) => {
                if (id !== undefined) {
                  memorize_list.push(val);
                  memorizeList.next([...memorize_list]);
                } else {
                  throw new FirebaseError('code', 'Save error.')
                }
              }
            }
          }
      }
  }
  createId(): string {
    return 'TestId';
  }
  restore(): void {
    memorize_list = [{...immutableItem}];
    memorizeList.next([...memorize_list]);
  }
}
