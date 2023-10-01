import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { MemorizeItem } from '../memorize/shared/models/memorize.model';
import { User } from '../auth/models/user';
import { MemorizationService } from '../memorize/shared/services/memorization.service';
import { AuthService } from '../auth/services/auth.service';
import { Store } from '@ngrx/store';
import { selectMemorizeItems } from '../memorize/store';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  private itemsToRemind$: BehaviorSubject<MemorizeItem[] | undefined> = new BehaviorSubject<MemorizeItem[] | undefined>(
    undefined
  );
  private itemsCount$: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);
  private allItems$: Observable<MemorizeItem[]>;

  constructor(private readonly store: Store) {
    this.allItems$ = this.store.select(selectMemorizeItems);

    this.allItems$.subscribe((memorize_list: MemorizeItem[]): void => {
      const today: Date = new Date();
      const itemsToRemind: MemorizeItem[] = [];
      let itemsCount: number = 0;

      memorize_list.forEach((item: MemorizeItem) => {
        if (item.getReminderDate().getDate() <= today.getDate()) {
          itemsToRemind.push(item);
          itemsCount++;
        }
      });

      this.itemsCount$.next(itemsCount);
      this.itemsToRemind$.next(itemsToRemind);
    });
  }

  public getBadgeInfo(): Observable<number | undefined> {
    return this.itemsCount$.asObservable();
  }

  public getItems(): Observable<MemorizeItem[] | undefined> {
    return this.itemsToRemind$.asObservable();
  }
}
