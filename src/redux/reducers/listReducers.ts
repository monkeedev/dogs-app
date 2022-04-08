import {
  DogItem,
  ListActions,
  ListActionsTypes,
  ListState,
} from '../types/listTypes';

const initialState: ListState = {
  list: {
    data: [],
    error: '',
    loading: false,
  },
  bookmarks: [],
  history: [],
};

const toggleItemInStorage = (
  item: string | DogItem,
  storage: any,
  preventSplicing = false,
) => {
  let _storage: string[] = Object.assign([], storage);

  if (!storage) {
    _storage.push(item as any);
  } else {
    let idx = null;

    if (typeof item === 'string') {
      idx = storage.indexOf(item);
    } else if (typeof item === 'object') {
      idx = storage.findIndex((i: DogItem) => i.img === item.img);
    }

    if (idx === -1) {
      _storage = [item as any, ..._storage];
    } else {
      if (!preventSplicing) {
        _storage.splice(idx, 1);
      }
    }
  }

  return _storage;
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
      const list = [...new Set([...state.list.data, ...action.payload])];

      return {
        ...state,
        list: {
          data: list,
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

    case ListActions.CLEAR_LIST:
      return {
        ...state,
        list: {
          error: '',
          data: [],
          loading: false,
        },
      };

    case ListActions.SAVE_TO_BOOKMARKS:
      return {
        ...state,
        bookmarks: toggleItemInStorage(action.payload.img, state.bookmarks),
      };

    case ListActions.TOGGLE_IN_HISTORY:
      return {
        ...state,
        history: toggleItemInStorage(action.payload.item, state.history, true),
      };

    default:
      return state;
  }
};
