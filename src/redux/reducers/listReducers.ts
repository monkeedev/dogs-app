import {StatedObject} from '../../utils/types';
import {ListActions, ListActionsTypes, ListState} from '../types/listTypes';

const initialState: ListState = {
  list: {
    data: [],
    error: '',
    loading: false,
  },
  saved: [],
};

export const listReducer = (state = initialState, action: ListActionsTypes) => {
  switch (action.type) {
    case ListActions.FETCH_LIST_LOADING:
      return {
        ...state,
        list: {
          data: state.list?.data,
          error: '',
          loading: true,
        },
      };

    case ListActions.FETCH_LIST_SUCCESS:
      return {
        ...state,
        list: {
          data: action.payload,
          error: '',
          loading: false,
        },
      };

    case ListActions.FETCH_LIST_ERROR:
      return {
        ...state,
        list: {
          data: state.list?.data,
          error: action.payload.error,
          loading: false,
        },
      };

    case ListActions.SAVE_TO_BOOKMARKS:
      // ...
      return state;

    default:
      return state;
  }
};
