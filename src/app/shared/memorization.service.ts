import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseError } from '@firebase/util'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MemorizeItem } from './memorize/memorize.model';

type MemorizeItemFromDB = {
  id: string;
  text: string;
  description: string;
  progress: number;
  date: Date;
  reminderDate: Date;
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
    private readonly db: AngularFirestore
  ) { }

  public getMemorizeItems(): Observable<MemorizeItem[]> {
    return this.getCollectionValue()
      .pipe(
        map(
          (res: MemorizeItemFromDB[]): MemorizeItem[] => {
            const items: MemorizeItem[] = res.map((e: MemorizeItemFromDB): MemorizeItem => {
              return new MemorizeItem(e);
            });

            return items;
          }
        )
      );
  }

  public createItem(userInput: CreateMemorizeItem): true | Error {
    const document: firebase.default.firestore.DocumentReference<unknown> = this.db.collection(MemorizationService.DB_COLLECTION_NAME).ref.doc();
    const documentUID: string = document.id;
    const memorizeItem: MemorizeItem = new MemorizeItem({
      id: documentUID,
      date: new Date(),
      reminderDate: new Date(),
      progress: 10,
      description: userInput.description,
      text: userInput.text
    });
    const reminderDate: Date = memorizeItem.updateReminderDate();
    this.setReminder(documentUID, reminderDate);

    try {
      document.set(memorizeItem.toPlainObj());

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

      return true;
    } catch(e: unknown) {
      return this.errorHandler(e);
    }
  }

  public setReminder(uuid: string, dateReminder: Date): void {
    // TODO: Send reminder date and id to backend.
  }

  private getCollectionValue(): Observable<MemorizeItemFromDB[]> {
    return <Observable<MemorizeItemFromDB[]>>this.db.collection(MemorizationService.DB_COLLECTION_NAME)
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
