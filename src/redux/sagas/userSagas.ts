import auth from '@react-native-firebase/auth';
import {put, takeLatest} from 'redux-saga/effects';
import {ErrorMessages} from '../../utils/constants';
import {UserActions} from '../types/userTypes';

export function* watchAllUserSagas() {
  yield takeLatest(UserActions.LOG_IN_LOADING, tryToLogIn);
}

export function* tryToLogIn({payload}: any) {
  try {
    const {email, password} = payload;

    yield auth().signInWithEmailAndPassword(email, password);
    yield put({type: UserActions.LOG_IN_SUCCESS, payload});
  } catch (error: any) {
    let msg = '';

    console.log(error.code);

    switch (error.code) {
      case 'auth/invalid-email':
        msg = 'Email is invalid';
        break;

      case 'auth/user-not-found':
        msg = 'User not found';
        break;

      case 'auth/wrong-password':
        msg = 'Password is wrong';
        break;

      case 'auth/too-many-requests':
        msg = 'Too many requests, take a break';
        break;

      default:
        msg = ErrorMessages.Default;
        break;
    }

    yield put({type: UserActions.LOG_IN_FAILURE, payload: msg});
  }
}
