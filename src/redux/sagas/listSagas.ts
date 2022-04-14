import {put, select, takeLatest} from 'redux-saga/effects';
import {DogApiResponse} from '../../api/interfaces';
import Api from '../../api/requests';
import {ErrorMessages, notificationRef} from '../../utils/constants';
import {checkImageCache} from '../../utils/helpers/cache';
import {clearDogsList} from '../actions/listActions';
import {getDogsCatalog} from '../rootSelector';
import {ListActions} from '../types/listTypes';

export function* watchAllSagas() {
  yield takeLatest(ListActions.FETCH_LIST_LOADING, fetchDogList);
  yield takeLatest(
    ListActions.RESTORE_CACHES_FROM_LISTS,
    restoreCacheFromLists,
  );
}

export function* fetchDogList({payload}: any) {
  try {
    const {search, isSubbreed, isFresh, quantity} = payload;

    if (isFresh) {
      yield put(clearDogsList());
    }

    const res: DogApiResponse = yield isSubbreed
      ? Api.fetchDogBySubbreed(search, quantity)
      : Api.fetchDogs(null, quantity);

    const {message, status} = res;

    yield put({
      type:
        status === 'success'
          ? ListActions.FETCH_LIST_SUCCESS
          : ListActions.FETCH_LIST_ERROR,
      payload: message,
    });
  } catch (error) {
    yield put({type: ListActions.FETCH_LIST_ERROR, payload: error});
  }
}

export function* restoreCacheFromLists() {
  try {
    const {list, bookmarks} = yield select(getDogsCatalog);

    if (list.data.length > 0) {
      for (const key in list.data) {
        yield checkImageCache(list.data[key]);
      }
    }

    if (bookmarks.length > 0) {
      for (const key in list.data) {
        yield checkImageCache(bookmarks[key]);
      }
    }
  } catch (error) {
    notificationRef.current?.show(ErrorMessages.Default, 'error');
  }
}
