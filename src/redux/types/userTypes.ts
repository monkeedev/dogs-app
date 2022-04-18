import {ActionType} from '../../utils/types';

export interface UserState {
  theme: 'dark' | 'light';
}

export enum UserActions {
  CHANGE_THEME = 'CHANGE_THEME',
}

export type UserActionTypes = ActionType<
  UserActions.CHANGE_THEME,
  {theme: string}
>;
