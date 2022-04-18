import {UserActions, UserActionTypes, UserState} from '../types/userTypes';

const initialState: UserState = {
  theme: 'light',
};

export const userReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
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
