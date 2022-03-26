import {ActionType, StatedObject} from '../../utils/types';

export type DogItem = {
  name: string;
  img: string;
};

export interface ListState {
  list: StatedObject<string>;
  bookmarks: string[];
  history: DogItem[];
}

export enum ListActions {
  FETCH_LIST_LOADING = 'FETCH_LIST_LOADING',
  FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS',
  FETCH_LIST_ERROR = 'FETCH_LIST_ERROR',
  CLEAR_LIST = 'CLEAR_LIST',
  SAVE_TO_BOOKMARKS = 'SAVE_TO_BOOKMARKS',
  TOGGLE_IN_HISTORY = 'SAVE_TO_HISTORY',
}

export type ListActionsTypes =
  | ActionType<ListActions.FETCH_LIST_LOADING, {}>
  | ActionType<ListActions.FETCH_LIST_SUCCESS, {data: string[]}>
  | ActionType<ListActions.FETCH_LIST_ERROR, {error: string}>
  | ActionType<ListActions.CLEAR_LIST, {}>
  | ActionType<ListActions.SAVE_TO_BOOKMARKS, {img: string}>
  | ActionType<ListActions.TOGGLE_IN_HISTORY, {item: DogItem}>;
