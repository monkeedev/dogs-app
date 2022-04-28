import sh2 from 'shorthash2';
import {StatedObject} from '../../utils/types';
import {UserActions, UserActionTypes, UserState} from '../types/userTypes';

const initialState: UserState = {
  theme: 'light',
  user: {
    data: {},
    loading: false,
    error: '',
  } as StatedObject<{}>,
};

export const userReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case UserActions.LOG_IN:
      return {
        ...state,
        user: {
          login: sh2(action.payload.email),
          email: action.payload.email,
          password: action.payload.password,
        },
      };

    case UserActions.LOG_OUT:
      return {
        ...state,
        user: {
          data: {},
          loading: false,
          error: '',
        } as StatedObject<{}>,
      };

    case UserActions.CHANGE_THEME:
      return {
        ...state,
        theme:
          action.payload.theme ?? (state.theme === 'light' ? 'dark' : 'light'),
      };

    default:
      return state;
  }
};
