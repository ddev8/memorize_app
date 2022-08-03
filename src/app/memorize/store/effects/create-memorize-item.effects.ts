import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { User } from 'src/app/auth/models/user';
import { selectAuthUser } from 'src/app/auth/store';
import { MemorizeItem, MemorizePlainObject } from '../../shared/models/memorize.model';
import { MemorizationService } from '../../shared/services/memorization.service';
import {
  createMemorizeItem,
  createMemorizeItemFailure,
  createMemorizeItemSuccess,
} from '../actions/create-memorize-items.actions';

@Injectable()
export class CreateMemorizeItemEffects {
  constructor(private actions$: Actions, private memorizationService: MemorizationService, private store: Store) {}

  public createMemorizeItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createMemorizeItem),
      concatLatestFrom(() => this.store.select(selectAuthUser)),
      filter((payload): boolean => payload[1] !== null),
      switchMap((payload) => {
        const user: User = <User>payload[1];

        return this.memorizationService.createItem(payload[0].item, user.uid).pipe(
          map(() => {
            return createMemorizeItemSuccess();
          }),
          catchError((error) => of(createMemorizeItemFailure({ error })))
        );
      })
    );
  });
}
