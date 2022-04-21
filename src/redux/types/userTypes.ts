import {ActionType, User} from '../../utils/types';

export interface UserState {
  theme: 'dark' | 'light';
  user: User | {};
}

export enum UserActions {
  LOG_IN = 'LOG_IN',
  LOG_OUT = 'LOG_OUT',
  CHANGE_THEME = 'CHANGE_THEME',
}

export type UserActionTypes =
  | ActionType<UserActions.CHANGE_THEME, {theme: string}>
  | ActionType<UserActions.LOG_IN, {email: string; password: string}>
  | ActionType<UserActions.LOG_OUT, {}>;
