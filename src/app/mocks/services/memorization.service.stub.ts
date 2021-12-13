import { Observable, of } from "rxjs";
import { MemorizeItem } from "./memorize/memorize.model";

const memorizeList = [
  new MemorizeItem({
    id: "1",
    date: new Date(),
    text: "Text 1",
    description: "Desc 1",
    progress: 10,
    reminderDate: new Date(),
  }),
  new MemorizeItem({
    id: "2",
    date: new Date(),
    text: "Text 2",
    description: "Desc 2",
    progress: 10,
    reminderDate: new Date(),
  }),
]

export class MemorizationServiceStub {
  public getMemorizeItems(): Observable<MemorizeItem[]> {
    return of(memorizeList);
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
      memorizeList.push(memorizeItem);

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
    return <Observable<MemorizeItemFromDB[]>>this.db.collection(MemorizationService.DB_COLLECTION_NAME, ref => ref.orderBy('date'))
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
