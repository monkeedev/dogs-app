import {ListActions} from '../types/listTypes';

export const updateList = () => ({
  type: ListActions.UPDATE_LIST,
  payload: {},
});

export const saveToBookmarks = (img: string) => ({
  type: ListActions.SAVE_TO_BOOKMARKS,
  payload: {img},
});
