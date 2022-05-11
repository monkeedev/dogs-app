import {put, takeLatest} from 'redux-saga/effects';
import {DogApiResponse} from '../../api/interfaces';
import Api from '../../api/requests';
import {clearDogsList} from '../actions/listActions';
import {ListActions} from '../types/listTypes';

export function* watchAllListSagas() {
  yield takeLatest(ListActions.FETCH_LIST_LOADING, fetchDogList);
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
