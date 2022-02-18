import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseError } from '@firebase/util'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { addMemorizeItem, loadMemorizeItemsSuccess, removeMemorizeItem } from '../../state';

import { MemorizeItem } from '../models/memorize.model';

export type MemorizeItemFromDB = {
  id: string;
  uid: string;
  text: string;
  description: string;
  progress: number;
  date: any;
  reminderDate: any;
};

type CreateMemorizeItem = {
  text: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class MemorizationService {
  private static readonly DB_COLLECTION_NAME: string = 'memorize_list';

  constructor(
    private readonly db: AngularFirestore,
    private readonly store: Store,
  ) { }

  public getMemorizeItems(uid: string): Observable<MemorizeItem[]> {
    return this.getCollectionValue(uid)
      .pipe(
        map(
          (res: MemorizeItemFromDB[]): MemorizeItem[] => {
            const items: MemorizeItem[] = res.map((e: MemorizeItemFromDB): MemorizeItem => {
              return new MemorizeItem(e);
            });
            this.store.dispatch(loadMemorizeItemsSuccess({ memorizeItems: res }))

            return items;
          }
        )
      );
  }

  public createItem(userInput: CreateMemorizeItem, uid: string): true | Error {
    try {
      const documentUID: string = this.db.createId();
      const memorizeItem: MemorizeItem = new MemorizeItem({
        id: documentUID,
        date: new Date().toISOString(),
        reminderDate: new Date().toISOString(),
        progress: 10,
        description: userInput.description,
        text: userInput.text,
        uid: uid,
      });
      const reminderDate: Date = memorizeItem.updateReminderDate();
      this.setReminder(documentUID, reminderDate);

      this.db.collection(MemorizationService.DB_COLLECTION_NAME)
        .doc(documentUID)
        .set(memorizeItem.toPlainObj());
      this.store.dispatch(addMemorizeItem({ memorizeItem: memorizeItem.toPlainObj() }))

      return true;
    } catch(e: unknown) {
      return this.errorHandler(e);
    }
  }

  public updateItem(memorizeItem: MemorizeItem): true | Error {
    try {
      this.db.collection(MemorizationService.DB_COLLECTION_NAME)
        .doc(memorizeItem.getId())
        .update({
          text: memorizeItem.getText(),
          description: memorizeItem.getDescription(),
          progress: memorizeItem.getProgress(),
          date: memorizeItem.getDate(),
          remind_date: memorizeItem.getReminderDate(),
        });

      return true;
    } catch(e: unknown) {
      return this.errorHandler(e);
    }
  }

  public deleteItem(memorizeItem: MemorizeItem): true | Error {
    try {
      this.db.collection(MemorizationService.DB_COLLECTION_NAME)
        .doc(memorizeItem.getId())
        .delete();
      this.store.dispatch(removeMemorizeItem({ memorizeItemId: memorizeItem.getId() }));

      return true;
    } catch(e: unknown) {
      return this.errorHandler(e);
    }
  }

  public setReminder(uuid: string, dateReminder: Date): void {
    // TODO: Send reminder date and id to backend.
  }

  private getCollectionValue(uid: string): Observable<MemorizeItemFromDB[]> {
    return <Observable<MemorizeItemFromDB[]>>this.db.collection(MemorizationService.DB_COLLECTION_NAME, ref => ref.orderBy('date')
      .where('uid', '==', uid))
      .valueChanges({ idField: 'id'})
  }

  private errorHandler(e: unknown): Error {
    console.error(e);
      const message: string = typeof e === 'object' && e !== null && e.hasOwnProperty('code')
        ? `${(<FirebaseError>e).name}: ${(<FirebaseError>e).code}`
        : 'Unknown error. Check console.';

      return new Error(message);
  }
}
