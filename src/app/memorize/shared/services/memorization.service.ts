import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseError } from '@firebase/util'
import { Store } from '@ngrx/store';
import { EMPTY, from, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// import { addMemorizeItem, loadMemorizeItemsSuccess, removeMemorizeItem } from '../../state';

import { MemorizeItem, MemorizePlainObject } from '../models/memorize.model';

export type CreateMemorizeItem = {
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
  ) { }

  public getMemorizeItems(uid: string): Observable<MemorizePlainObject[]> {
    return this.getCollectionValue(uid);
  }

  public  createItem(userInput: CreateMemorizeItem, uid: string): Observable<MemorizePlainObject> {
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
    const createPromise = this.db.collection(MemorizationService.DB_COLLECTION_NAME)
      .doc(documentUID)
      .set(memorizeItem.toPlainObj())

    return from(createPromise)
      .pipe(
        map((): MemorizePlainObject => {
          return memorizeItem.toPlainObj();
        }),
        catchError((e): Observable<any> => {
          return throwError(this.errorHandler(e));
        })
      )
  }

  public updateItem(memorizeItem: MemorizeItem): Observable<MemorizePlainObject> {
    const updatePromise: Promise<void> = this.db.collection(MemorizationService.DB_COLLECTION_NAME)
      .doc(memorizeItem.getId())
      .update({
        text: memorizeItem.getText(),
        description: memorizeItem.getDescription(),
        progress: memorizeItem.getProgress(),
        date: memorizeItem.getDate().toISOString(),
        remind_date: memorizeItem.getReminderDate(),
      });

    return from(updatePromise)
      .pipe(
        map((): MemorizePlainObject => {
          return memorizeItem.toPlainObj();
        }),
        catchError((e): Observable<any> => {
          return throwError(this.errorHandler(e));
        })
      )
  }

  public deleteItem(memorizeItem: MemorizeItem): Observable<MemorizePlainObject> {
    const deletePromise: Promise<void> = this.db.collection(MemorizationService.DB_COLLECTION_NAME)
      .doc(memorizeItem.getId())
      .delete();

    return from(deletePromise)
      .pipe(
        map((): any => {
          throw new Error('sadfas');

          return memorizeItem.toPlainObj();
        }),
        catchError((e): Observable<any> => {
          throw this.errorHandler(e);
        })
      )
  }

  public setReminder(uuid: string, dateReminder: Date): void {
    // TODO: Send reminder date and id to backend.
  }

  private getCollectionValue(uid: string): Observable<MemorizePlainObject[]> {
    return <Observable<MemorizePlainObject[]>>this.db.collection(MemorizationService.DB_COLLECTION_NAME, ref => ref.orderBy('date')
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
