import {ActionType, StatedObject, User} from '../../utils/types';

export interface UserState {
  theme: 'dark' | 'light';
  user: StatedObject<User> | StatedObject<{}>;
}

export enum UserActions {
  LOG_IN_LOADING = 'LOG_IN_LOADING',
  LOG_IN_SUCCESS = 'LOG_IN_SUCCESS',
  LOG_IN_FAILURE = 'LOG_IN_FAILURE',
  LOG_OUT_LOADING = 'LOG_OUT_LOADING',
  LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS',
  LOG_OUT_FAILURE = 'LOG_OUT_FAILURE',
  CHANGE_THEME = 'CHANGE_THEME',
  SIGN_IN_LOADING = 'SIGN_IN_LOADING',
  SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE = 'SIGN_IN_FAILURE',
}

export type UserActionTypes =
  | ActionType<UserActions.CHANGE_THEME, {theme: string}>
  | ActionType<UserActions.LOG_IN_LOADING, {email: string; password: string}>
  | ActionType<UserActions.LOG_IN_SUCCESS, {email: string; password: string}>
  | ActionType<UserActions.LOG_IN_FAILURE, {error: string}>
  | ActionType<UserActions.LOG_OUT_LOADING, null>
  | ActionType<UserActions.LOG_OUT_SUCCESS, null>
  | ActionType<UserActions.LOG_OUT_FAILURE, {error: string}>
  | ActionType<UserActions.SIGN_IN_LOADING, {}>
  | ActionType<UserActions.SIGN_IN_SUCCESS, {data: User}>
  | ActionType<UserActions.SIGN_IN_FAILURE, {error: string}>;
