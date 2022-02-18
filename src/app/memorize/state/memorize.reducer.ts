import { Action, createReducer, on } from "@ngrx/store";
import * as MemorizeActions from "./memorize.actions";
import { initialState, MemorizeState } from "./memorize.state";

const memorizeReducer = createReducer(
  initialState,
  on(MemorizeActions.loadMemorizeItems, (state) => ({
    ...state
  })),
  on(MemorizeActions.addMemorizeItem, (state, { memorizeItem }): MemorizeState => ({
    ...state,
    memorizeItems: [...state.memorizeItems, memorizeItem]
  })),
  on(MemorizeActions.removeMemorizeItem, (state, { memorizeItemId }): MemorizeState => ({
    ...state,
    memorizeItems: [...state.memorizeItems.filter((item) => item.id === memorizeItemId)]
  })),
  on(MemorizeActions.loadMemorizeItemsSuccess, (state, { memorizeItems }): MemorizeState => ({
    ...state,
    memorizeItems: memorizeItems
  }))
  // on(MemorizeActions.fetchMenuSuccess, (state, { menuItems }) => ({
  //   ...state,
  //   menuItems: menuItems,
  // })),
  // on(MemorizeActions.editMenuItemSuccess, (state, { menuItem }) => {
  //   const menuItemIndex = state.menuItems.findIndex(
  //     (item) => item.id === menuItem.id
  //   );
  //   const updatedMenuItems = [...state.menuItems];
  //   updatedMenuItems[menuItemIndex] = menuItem;
  //   return {
  //     ...state,
  //     menuItems: updatedMenuItems,
  //   };
  // }),
  // on(MemorizeActions.deleteMenuItemSuccess, (state, { menuId }) => {
  //   const menuItemIndex = state.menuItems.findIndex(
  //     (item) => item.id === menuId
  //   );
  //   const updatedMenuItems = [...state.menuItems];
  //   updatedMenuItems.splice(menuItemIndex, 1);
  //   return {
  //     ...state,
  //     menuItems: updatedMenuItems,
  //   };
  // })
);

export function reducer(state: MemorizeState | undefined, action: Action) {
  return memorizeReducer(state, action);
}
