import { createAction, props } from '@ngrx/store';
import { MemorizeItem } from '../../shared/models/memorize.model';

export const loadItems = createAction(
  '[LoadItems] Load Items'
);

export const loadItemsSuccess = createAction(
  '[LoadItems] Load Items Success',
  props<{ data: { items: MemorizeItem[] } }>()
);

export const loadItemsFailure = createAction(
  '[LoadItems] Load Items Failure',
  props<{ error: string }>()
);
