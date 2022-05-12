import auth from '@react-native-firebase/auth';
import {put, takeLatest} from 'redux-saga/effects';
import {ErrorMessages} from '../../utils/constants';
import {UserActions} from '../types/userTypes';

export function* watchAllUserSagas() {
  yield takeLatest(UserActions.LOG_IN_LOADING, tryToLogIn);
  yield takeLatest(UserActions.LOG_OUT_LOADING, tryToLogOut);
  yield takeLatest(UserActions.SIGN_IN_LOADING, tryToSignIn);
}

export function* tryToLogIn({payload}: any) {
  try {
    const {email, password} = payload;

    yield auth().signInWithEmailAndPassword(email, password);
    yield put({type: UserActions.LOG_IN_SUCCESS, payload});
  } catch (error: any) {
    let msg = '';

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

      default:
        msg = ErrorMessages.Default;
        break;
    }

    yield put({type: UserActions.LOG_IN_FAILURE, payload: msg});
  }
}

export function* tryToLogOut() {
  try {
    yield auth().signOut;
    yield put({type: UserActions.LOG_OUT_SUCCESS});
  } catch (error: any) {
    yield put({
      type: UserActions.LOG_OUT_FAILURE,
      payload: ErrorMessages.Default,
    });
  }
}

export function* tryToSignIn({payload}: any) {
  try {
    const {email, password} = payload;

    yield auth().createUserWithEmailAndPassword(email, password);
    yield put({type: UserActions.SIGN_IN_SUCCESS, payload});
  } catch (error: any) {
    let msg = '';

    switch (error.code) {
      case 'auth/email-already-in-use':
        msg = 'User with this email already exists';
        break;

      case 'auth/invalid-email':
        msg = 'Email is not valid';
        break;

      case 'auth/operation-not-allowed':
        // eslint-disable-next-line quotes
        msg = "Can't create user";
        break;

      case 'auth/weak-password':
        msg = 'Password is weak, try another';
        break;

      default:
        msg = ErrorMessages.Default;
        break;
    }

    yield put({type: UserActions.SIGN_IN_FAILURE, payload: msg});
  }
}
