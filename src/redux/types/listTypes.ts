import {ActionType} from '../../utils/types';

export interface ListState {
  list: string[];
  saved: string[];
}

export enum ListActions {
  UPDATE_LIST = 'UPDATE_LIST',
  SAVE_TO_BOOKMARKS = 'SAVE_TO_BOOKMARKS',
}

export type ListActionsTypes =
  | ActionType<ListActions.UPDATE_LIST, {}>
  | ActionType<ListActions.SAVE_TO_BOOKMARKS, {img: string}>;
