import { MemorizePlainObject } from "../shared/models/memorize.model";

export interface MemorizeState {
  items: MemorizePlainObject[];
}

export const initialState: MemorizeState = {
  items: [],
};
