import { Action, createReducer, on } from "@ngrx/store";
import * as MemorizeActions from "./memorize.actions";
import { initialState, MemorizeState } from "./memorize.state";

const memorizeReducer = createReducer(
  initialState,
  on(MemorizeActions.loadMemorizeItems, (state): MemorizeState => ({
    ...state
  })),
  on(MemorizeActions.addMemorizeItem, (state, { memorizeItem }): MemorizeState => ({
    ...state,
    items: [...state.items, memorizeItem]
  })),
  on(MemorizeActions.removeMemorizeItem, (state, { memorizeItemId }): MemorizeState => ({
    ...state,
    items: [...state.items.filter((item) => item.id === memorizeItemId)]
  })),
  on(MemorizeActions.loadMemorizeItemsSuccess, (state, { memorizeItems }): MemorizeState => ({
    ...state,
    items: memorizeItems
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
