import {all, fork} from 'redux-saga/effects';
import {watchAllListSagas} from './sagas/listSagas';
import {watchAllUserSagas} from './sagas/userSagas';

export default function* rootSaga() {
  yield all([fork(watchAllListSagas), fork(watchAllUserSagas)]);
}
