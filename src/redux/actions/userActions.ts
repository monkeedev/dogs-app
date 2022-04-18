import {UserActions} from '../types/userTypes';

export const changeTheme = (theme?: string) => ({
  type: UserActions.CHANGE_THEME,
  payload: {theme},
});
