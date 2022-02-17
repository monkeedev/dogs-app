import {watchFetchDogs} from './sagas/listSagas';
import {all, fork} from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([fork(watchFetchDogs)]);
}
