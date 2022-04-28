import {ActionType, StatedObject, User} from '../../utils/types';

export interface UserState {
  theme: 'dark' | 'light';
  user: StatedObject<User> | StatedObject<{}>;
}

export enum UserActions {
  LOG_IN = 'LOG_IN',
  LOG_OUT = 'LOG_OUT',
  CHANGE_THEME = 'CHANGE_THEME',
  SIGN_IN_LOADING = 'SIGN_IN_LOADING',
  SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE = 'SIGN_IN_FAILURE',
}

export type UserActionTypes =
  | ActionType<UserActions.CHANGE_THEME, {theme: string}>
  | ActionType<UserActions.LOG_IN, {email: string; password: string}>
  | ActionType<UserActions.LOG_OUT, {}>
  | ActionType<UserActions.SIGN_IN_LOADING, {}>
  | ActionType<UserActions.SIGN_IN_SUCCESS, {data: User}>
  | ActionType<UserActions.SIGN_IN_FAILURE, {error: string}>;
