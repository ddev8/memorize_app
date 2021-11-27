import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/compat/firestore';
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

  public getMemorizeItems(): Observable<any> {
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

  public createItem(userInput: CreateMemorizeItem): void {
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
    // TODO: Send reminder date and id to backend.
    document.set(memorizeItem.toPlainObj());
  }

  public updateItem(memorizeItem: MemorizeItem): void {
    this.db.collection(MemorizationService.DB_COLLECTION_NAME)
      .doc(memorizeItem.getId())
      .update({
        text: memorizeItem.getText(),
        description: memorizeItem.getDescription(),
        progress: memorizeItem.getProgress(),
        date: memorizeItem.getDate(),
        remind_date: memorizeItem.getReminderDate(),
      });
  }

  public deleteItem(memorizeItem: MemorizeItem): void {
    this.db.collection(MemorizationService.DB_COLLECTION_NAME)
      .doc(memorizeItem.getId())
      .delete();
  }

  // public setReminder(memorizeItem: MemorizeItem): boolean {
  //   return this.backend.saveReminder(memorizeItem.getId(), memorizeItem.getReminderDate());
  // }

  private getCollectionValue(): Observable<MemorizeItemFromDB[]> {
    return <Observable<MemorizeItemFromDB[]>>this.db.collection(MemorizationService.DB_COLLECTION_NAME)
      .valueChanges({ idField: 'id'})
  }
}
