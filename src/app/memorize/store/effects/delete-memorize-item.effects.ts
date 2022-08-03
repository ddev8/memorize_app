import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MemorizationService } from '../../shared/services/memorization.service';
import { deleteMemorizeItem, deleteMemorizeItemFailure, deleteMemorizeItemSuccess } from '../actions';

@Injectable()
export class DeleteMemorizeItemEffects {
  constructor(private actions$: Actions, private memorizationService: MemorizationService) {}

  public createMemorizeItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteMemorizeItem),
      switchMap((payload) => {
        return this.memorizationService.deleteItem(payload.item).pipe(
          map(() => {
            return deleteMemorizeItemSuccess();
          }),
          catchError((error: Error) => of(deleteMemorizeItemFailure({ error: error.message })))
        );
      })
    );
  });
}
