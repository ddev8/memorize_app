import { FirebaseError } from '@firebase/util';
import { of } from 'rxjs';
import { MemorizeItemFromDB } from '../shared/memorization.service';

export const immutableItem: MemorizeItemFromDB = {
  date: '2021-12-07T08:02:28.707Z',
  description: 'Create description',
  id: 'tLTBqdnNRuGg2xhfHuXd',
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
    text: 'Create text'
  }
];


export class AngularFireDatabaseMock {
  collection(query: string): any {
      return {
          valueChanges() {
              return of(memorize_list)
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

              },
              update: (val: any) => {
                const found_el: MemorizeItemFromDB | undefined = memorize_list.find((v: MemorizeItemFromDB) => v.id === id);
                if (found_el !== undefined) {
                  found_el.date = val.date;
                  found_el.description = val.description;
                  found_el.progress = val.progress;
                  found_el.reminderDate = val.reminderDate;
                  found_el.text = val.text;
                } else {
                  throw new FirebaseError('code', 'FireStore error');
                }
              },
              set: (val: any) => {
                if (id !== undefined) {
                  memorize_list.push(val);
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
  }
}
