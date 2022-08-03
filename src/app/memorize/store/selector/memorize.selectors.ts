import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MemorizeItem } from '../../shared/models/memorize.model';
import { memorizeFeatureKey, MemorizeState } from '../reducer/memorize.reducer';

const selectMemorizeItemFeature = createFeatureSelector<MemorizeState>(memorizeFeatureKey);

export const selectMemorizeItems = createSelector(selectMemorizeItemFeature, (state: MemorizeState): MemorizeItem[] =>
  state.items.map((i) => new MemorizeItem(i))
);
export const selectMemorizeItemLoading = createSelector(
  selectMemorizeItemFeature,
  (state: MemorizeState): boolean => state.loading
);
export const selectMemorizeItemError = createSelector(
  selectMemorizeItemFeature,
  (state: MemorizeState): string | null => state.error
);
