import { MemorizePlainObject } from "../shared/models/memorize.model";

export interface MemorizeState {
  memorizeItems: MemorizePlainObject[];
}

export const initialState: MemorizeState = {
  memorizeItems: [],
};
