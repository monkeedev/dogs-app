import {UserActions} from '../types/userTypes';

export const changeTheme = (theme?: string) => ({
  type: UserActions.CHANGE_THEME,
  payload: {theme},
});

export const logIn = (email: string, password: string) => ({
  type: UserActions.LOG_IN_LOADING,
  payload: {email, password},
});

export const logOut = () => ({
  type: UserActions.LOG_OUT,
  payload: {},
});
