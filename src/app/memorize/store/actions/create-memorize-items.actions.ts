import { createAction, props } from '@ngrx/store';
import { MemorizeItem, MemorizePlainObject } from '../../shared/models/memorize.model';
import { CreateMemorizeItem } from '../../shared/services/memorization.service';

export const createMemorizeItem = createAction(
  '[CreateMemorizeItem] CreateMemorizeItem',
  props<{ item: CreateMemorizeItem }>()
);

export const createMemorizeItemSuccess = createAction(
  '[CreateMemorizeItem] CreateMemorizeItem Success',
);

export const createMemorizeItemFailure = createAction(
  '[CreateMemorizeItem] CreateMemorizeItem Failure',
  props<{ error: string }>()
);
