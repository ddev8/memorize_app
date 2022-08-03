import { createAction, props } from '@ngrx/store';
import { MemorizeItem, MemorizePlainObject } from '../../shared/models/memorize.model';

export const updateMemorizeItem = createAction(
  '[UpdateMemorizeItem] UpdateMemorizeItem',
  props<{ item: MemorizeItem }>()
);

export const updateMemorizeItemSuccess = createAction('[UpdateMemorizeItem] UpdateMemorizeItem Success');

export const updateMemorizeItemFailure = createAction(
  '[UpdateMemorizeItem] UpdateMemorizeItem Failure',
  props<{ error: string }>()
);
