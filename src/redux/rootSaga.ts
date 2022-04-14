import {all, fork} from 'redux-saga/effects';
import {watchAllSagas} from './sagas/listSagas';

export default function* rootSaga() {
  yield all([fork(watchAllSagas)]);
}
