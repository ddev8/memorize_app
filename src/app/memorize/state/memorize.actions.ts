import { createAction, props } from "@ngrx/store";
import { MemorizePlainObject } from '../shared/models/memorize.model';

export const addMemorizeItem = createAction(
  '[Add Memorize Item] Add memorize item',
  props<{ memorizeItem: MemorizePlainObject }>()
)

export const addMemorizeItemSuccess = createAction(
  '[Add Memorize Item] Add memorize item success',
  props<{ memorizeItem: MemorizePlainObject }>()
)

export const addMemorizeItemFailed = createAction(
  '[Add Memorize Item] Add memorize item failed',
  props<{ error: any }>()
)

export const loadMemorizeItems = createAction(
  '[Load Memorize Items] Load memorize items'
)

export const loadMemorizeItemsSuccess = createAction(
  '[Load Memorize Items] Load memorize items success',
  props<{ memorizeItems: MemorizePlainObject[] }>()
)

export const loadMemorizeItemsFailed = createAction(
  '[Load Memorize Items] Load memorize items failed',
  props<{ error: any }>()
)

export const removeMemorizeItem = createAction(
  '[Remove Memorize Item] Remove memorize item',
  props<{ memorizeItemId: string }>()
)
