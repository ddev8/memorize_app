import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { User } from 'src/app/auth/models/user';
import { selectAuthUser } from 'src/app/auth/store';
import { MemorizeItem } from '../../shared/models/memorize.model';
import { MemorizationService } from '../../shared/services/memorization.service';
import { loadItems, loadItemsFailure, loadItemsSuccess } from '../actions';
import { MemorizeState } from '../reducer/memorize.reducer';
import { selectMemorizeItems } from '../selector/memorize.selectors';



@Injectable()
export class LoadItemsEffects {
  getMemorizeItems: any;

  constructor(
    private actions$: Actions,
    private memorizationService: MemorizationService,
    private store: Store
  ) {}

  public loadItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadItems),
      concatLatestFrom(() => this.store.select(selectAuthUser)),
      filter((payload): boolean => payload[1] !== null),
      switchMap((payload) => {
        const user: User = <User>payload[1];

        return this.memorizationService.getMemorizeItems(user.uid)
          .pipe(
            map((items) => {
              return loadItemsSuccess({ items })
            }),
            catchError((error) => of(loadItemsFailure({ error })))
          )
      })
    )
  })
}
