import {takeLatest, put, select} from 'redux-saga/effects';

import Api from '../../api/requests';
import {DogApiResponse} from '../../api/interfaces';
import {getDogsCatalog} from '../rootSelector';
import {ListActions} from '../types/listTypes';

export function* workFetchList({payload}: any) {
  try {
    const {data} = yield select(getDogsCatalog);
    const {search, isSubbreed, quantity} = payload;

    const res: DogApiResponse = yield isSubbreed
      ? Api.fetchDogBySubbreed(search, quantity)
      : Api.fetchDogs(search ?? null, quantity);

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

export function* watchFetchDogs() {
  yield takeLatest(ListActions.FETCH_LIST_LOADING, workFetchList);
}
