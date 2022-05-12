import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {clearBookmarks} from '../../../redux/actions/listActions';
import {getDogsCatalog} from '../../../redux/rootSelector';
import {colors, notificationRef} from '../../../utils/constants';
import {showAlert} from '../../../utils/functions';
import {ShowAlertProps} from '../../../utils/types';
import {Setting} from './Setting';

export const BookmarksLink = () => {
  const dispatch = useDispatch();
  const {bookmarks} = useSelector(getDogsCatalog);

  const bookmarksModal: ShowAlertProps = {
    title: 'Delete bookmarks?',
    message: 'All bookmarked images will be deleted',
    buttons: [
      {
        text: 'OK',
        onPress: () => {
          dispatch(clearBookmarks());
          notificationRef.current?.show('Done!', 'success');
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
    <Setting
      text={'Bookmarks'}
      action={() => showAlert(bookmarksModal)}
      iconConfig={{name: 'bookmark', type: 'feather'}}
      component={<Text style={styles.text}>{bookmarks.length}</Text>}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.gray,
    marginRight: 7,
  },
});
