import { Action, createReducer, on } from '@ngrx/store';
import { MemorizeItem } from '../../shared/models/memorize.model';
import { loadItems, loadItemsFailure, loadItemsSuccess } from '../actions';


export const memorizeFeatureKey = 'memorizeItems';

export interface MemorizeState {
  items: MemorizeItem[];
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
  on(loadItemsSuccess, (state, action): MemorizeState => ({ ...state, loading: false, items: action.data.items })),
  on(loadItemsFailure, (state, action): MemorizeState => ({ ...state, loading: false, error: action.error })),
);
