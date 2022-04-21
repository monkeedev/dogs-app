import React from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {logOut} from '../../../redux/actions/userActions';
import {showAlert} from '../../../utils/functions';
import {ShowAlertProps} from '../../../utils/types';
import {Link} from './Link';

export const LogOutLink = () => {
  const dispatch = useDispatch();

  const logoutModal: ShowAlertProps = {
    title: 'Logout',
    message: 'Do you really want to logout?',
    buttons: [
      {
        text: 'OK',
        onPress: () => {
          dispatch(logOut());
        },
        style: 'default',
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ],
  };

  return (
    <Link
      text={'Log out'}
      action={() => showAlert(logoutModal)}
      iconConfig={{name: 'log-out', type: 'feather'}}
    />
  );
};

const styles = StyleSheet.create({});
