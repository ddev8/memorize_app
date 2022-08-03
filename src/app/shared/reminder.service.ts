import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { MemorizeItem } from '../memorize/shared/models/memorize.model';
import { User } from '../auth/models/user';
import { MemorizationService } from '../memorize/shared/services/memorization.service';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  private itemsToRemind$: Subject<MemorizeItem[]> = new Subject();
  private itemsCount$: Subject<number> = new Subject();

  constructor(private readonly db: MemorizationService, private readonly authService: AuthService) {
    this.authService
      .getUser()
      .pipe(
        filter((val: User | undefined): val is User => {
          console.log(val);

          return val !== undefined;
        }),
        switchMap((val: User): Observable<MemorizeItem[]> => this.db.getMemorizeItems(val.uid))
      )
      .subscribe((memorize_list: MemorizeItem[]): void => {
        const today: Date = new Date();
        const itemsToRemind: MemorizeItem[] = [];
        let itemsCount: number = 0;

        memorize_list.forEach((item: MemorizeItem) => {
          if (item.getReminderDate().getDate() <= today.getDate()) {
            console.log(item, 'Should be reminded today');
            itemsToRemind.push(item);
            itemsCount++;
          }
        });

        this.itemsCount$.next(itemsCount);
        this.itemsToRemind$.next(itemsToRemind);
      });
  }

  public getBadgeInfo(): Observable<number> {
    return this.itemsCount$;
  }

  public getItems(): Observable<MemorizeItem[]> {
    return this.itemsToRemind$;
  }
}
