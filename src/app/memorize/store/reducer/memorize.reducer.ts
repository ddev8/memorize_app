import { Action, createReducer, on } from '@ngrx/store';
import { MemorizeItem, MemorizePlainObject } from '../../shared/models/memorize.model';
import { deleteMemorizeItem, deleteMemorizeItemFailure, deleteMemorizeItemSuccess, loadItems, loadItemsFailure, loadItemsSuccess, updateMemorizeItem, updateMemorizeItemFailure, updateMemorizeItemSuccess } from '../actions';
import { createMemorizeItem, createMemorizeItemFailure, createMemorizeItemSuccess } from '../actions/create-memorize-items.actions';


export const memorizeFeatureKey = 'memorizeItems';

export interface MemorizeState {
  items: MemorizePlainObject[];
  loading: boolean;
  error: string | null;
}

export const initialState: MemorizeState = {
  items: [],
  loading: false,
  error: null
};

export const MemorizeReducer = createReducer(
  initialState,

  on(loadItems, (state): MemorizeState => ({ ...state, loading: true })),
  on(loadItemsSuccess, (state, action): MemorizeState => ({ ...state, loading: false, items: action.items })),
  on(loadItemsFailure, (state, action): MemorizeState => ({ ...state, loading: false, error: action.error })),

  on(createMemorizeItem, (state): MemorizeState => ({ ...state, loading: true })),
  on(createMemorizeItemSuccess, (state, action): MemorizeState => ({ ...state, loading: false })),
  on(createMemorizeItemFailure, (state, action): MemorizeState => ({ ...state, loading: false, error: action.error })),

  on(updateMemorizeItem, (state): MemorizeState => ({ ...state, loading: true })),
  on(updateMemorizeItemSuccess, (state, action): MemorizeState => ({ ...state, loading: false })),
  on(updateMemorizeItemFailure, (state, action): MemorizeState => ({ ...state, loading: false, error: action.error })),

  on(deleteMemorizeItem, (state): MemorizeState => ({ ...state, loading: true })),
  on(deleteMemorizeItemSuccess, (state, action): MemorizeState => ({ ...state, loading: false })),
  on(deleteMemorizeItemFailure, (state, action): MemorizeState => ({ ...state, loading: false, error: action.error })),
);
