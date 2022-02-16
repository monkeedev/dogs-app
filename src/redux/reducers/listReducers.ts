import {ListActions, ListActionsTypes, ListState} from '../types/listTypes';

const initialState: ListState = {
  list: [],
  saved: [],
};

export const listReducers = (
  state = initialState,
  action: ListActionsTypes,
) => {
  switch (action.type) {
    case ListActions.UPDATE_LIST:
      // ...
      return state;

    case ListActions.SAVE_TO_BOOKMARKS:
      // ...
      return state;

    default:
      return state;
  }
};
