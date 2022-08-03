import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { MemorizationService } from '../../shared/services/memorization.service';
import { updateMemorizeItem, updateMemorizeItemFailure, updateMemorizeItemSuccess } from '../actions';

@Injectable()
export class UpdateMemorizeItemEffects {
  constructor(private actions$: Actions, private memorizationService: MemorizationService) {}

  public createMemorizeItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateMemorizeItem),
      switchMap((payload) => {
        return this.memorizationService.updateItem(payload.item).pipe(
          map(() => {
            return updateMemorizeItemSuccess();
          }),
          catchError((error) => of(updateMemorizeItemFailure({ error })))
        );
      })
    );
  });
}
