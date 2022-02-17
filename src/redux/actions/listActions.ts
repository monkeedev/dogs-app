import {ListActions} from '../types/listTypes';

export const fetchDogsList = (
  search?: string,
  isSubbreed?: boolean,
  quantity = 10,
) => ({
  type: ListActions.FETCH_LIST_LOADING,
  payload: {search, isSubbreed, quantity},
});

export const saveToBookmarks = (img: string) => ({
  type: ListActions.SAVE_TO_BOOKMARKS,
  payload: {img},
});
