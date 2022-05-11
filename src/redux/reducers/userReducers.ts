import {StatedObject, User} from '../../utils/types';
import {UserActions, UserActionTypes, UserState} from '../types/userTypes';

const initialState: UserState = {
  theme: 'light',
  user: {
    data: {},
    loading: false,
    error: '',
  } as StatedObject<User>,
};

export const userReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case UserActions.LOG_IN_LOADING:
      return {
        ...state,
        user: {
          data: {},
          loading: true,
          error: '',
        },
      };

    case UserActions.LOG_IN_SUCCESS:
      return {
        ...state,
        user: {
          data: {
            login: action.payload.email.slice(
              0,
              action.payload.email.indexOf('@'),
            ),
            mail: action.payload.email,
            phone: '',
          },
          loading: false,
          error: '',
        },
      };

    case UserActions.LOG_IN_FAILURE:
      return {
        ...state,
        user: {
          data: {},
          loading: false,
          error: action.payload,
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
