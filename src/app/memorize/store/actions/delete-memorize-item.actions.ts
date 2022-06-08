import { createAction, props } from '@ngrx/store';
import { MemorizeItem, MemorizePlainObject } from '../../shared/models/memorize.model';

export const deleteMemorizeItem = createAction(
  '[DeleteMemorizeItem] DeleteMemorizeItem',
  props<{ item: MemorizeItem }>()
);

export const deleteMemorizeItemSuccess = createAction(
  '[DeleteMemorizeItem] DeleteMemorizeItem Success',
);

export const deleteMemorizeItemFailure = createAction(
  '[DeleteMemorizeItem] DeleteMemorizeItem Failure',
  props<{ error: string }>()
);
