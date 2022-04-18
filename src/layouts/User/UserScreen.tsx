import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MainStyles} from '../../assets/styles/MainStyles';
import {Checkbox} from '../../components/buttons';
import {Title} from '../../components/texts';
import {DefaultWrapper} from '../../components/wrappers/DefaultWrapper';
import {clearBookmarks} from '../../redux/actions/listActions';
import {changeTheme} from '../../redux/actions/userActions';
import {getDogsCatalog, getUserStorage} from '../../redux/rootSelector';
import {colors, ErrorMessages, notificationRef} from '../../utils/constants';
import {isAndroid, showAlert} from '../../utils/functions';
import {clearCache, getCacheSize} from '../../utils/helpers/cache';
import {ShowAlertProps} from '../../utils/types';
import {List, Setting} from './Components';

export const UserScreen = () => {
  const isFocused = useIsFocused();

  const {bookmarks} = useSelector(getDogsCatalog);
  const {theme} = useSelector(getUserStorage);
  const dispatch = useDispatch();

  const [size, setSize] = useState<number>(0);

  const toggleDarkMode = () => {
    dispatch(changeTheme());
  };

  useEffect(() => {
    if (isFocused) {
      getCacheSize().then(res => setSize(res));
    }
  }, [isFocused]);

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

  const cacheModal: ShowAlertProps = {
    title: 'Clear cache?',
    message: 'Cache folder will be cleared',
    buttons: [
      {
        text: 'OK',
        onPress: () => {
          clearCache()
            .then(() => {
              setSize(0);
              notificationRef.current?.show('Done!', 'success');
            })
            .catch(() => {
              notificationRef.current?.show(ErrorMessages.Default, 'error');
            });
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
    <DefaultWrapper>
      <View style={styles.header}>
        <Title text={`Hello, ${theme}!`} />
      </View>

      <List title={'preferences'}>
        <Setting
          text={'Dark mode'}
          action={toggleDarkMode}
          iconConfig={{name: 'moon', type: 'feather'}}
          component={<Checkbox state={theme === 'dark'} />}
        />
      </List>

      <List title={'content'}>
        <Setting
          text={'Bookmarks'}
          action={() => showAlert(bookmarksModal)}
          iconConfig={{name: 'bookmark', type: 'feather'}}
          component={
            <Text style={styles.settingsText}>{bookmarks.length}</Text>
          }
        />
        <Setting
          text={'Cache'}
          action={() => showAlert(cacheModal)}
          iconConfig={{name: 'folder', type: 'feather'}}
          component={
            <Text style={styles.settingsText}>{size.toFixed(2)} MB</Text>
          }
        />
      </List>
    </DefaultWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    ...MainStyles.rowFull,
    alignItems: 'flex-end',
    marginTop: isAndroid() ? 35 : 9,
    marginHorizontal: 14,
    marginBottom: 7,
  },
  settingsText: {
    color: colors.gray,
    marginRight: 7,
  },
});
