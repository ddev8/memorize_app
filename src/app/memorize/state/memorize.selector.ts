import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MemorizeItemFromDB } from "../shared/services/memorization.service";

export const getMemorizeItems = createSelector(
  createFeatureSelector('memorizeItems'),
  (state: MemorizeItemFromDB[]) => {
    return state;
  }
)
