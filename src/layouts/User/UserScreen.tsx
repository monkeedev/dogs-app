import {useNavigationState} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import RNFS from 'react-native-fs';
import {useDispatch, useSelector} from 'react-redux';
import {MainStyles} from '../../assets/styles/MainStyles';
import {Checkbox} from '../../components/buttons';
import {Preheader, Title} from '../../components/texts';
import {clearBookmarks} from '../../redux/actions/listActions';
import {getDogsCatalog} from '../../redux/rootSelector';
import {colors, ErrorMessages, notificationRef} from '../../utils/constants';
import {isAndroid, showAlert} from '../../utils/functions';
import {clearCache} from '../../utils/helpers/cache';
import {ShowAlertProps} from '../../utils/types';
import {Link, Setting} from './Components';

const USER = 'User'; // test constant

export const UserScreen = () => {
  const navState = useNavigationState(state => state);
  const {bookmarks} = useSelector(getDogsCatalog);
  const dispatch = useDispatch();

  const [size, setSize] = useState<number>(0);
  const [isDarkModeEnabled, setDarkMode] = useState<boolean>(false);

  // check cache size
  const getCacheSize = useCallback(async () => {
    const s = await RNFS.readDir(RNFS.CachesDirectoryPath);
    if (s.length > 0) {
      const bytes = s.reduce((a, c) => {
        a += c.size;
        return a;
      }, 0);

      setSize(bytes / 1000000);
    } else {
      setSize(0);
    }
  }, []);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  useEffect(() => {
    getCacheSize();
  }, [getCacheSize, navState]);

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
            .then(getCacheSize)
            .then(() => {
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title text={`Hello, ${USER}!`} />
      </View>

      <View style={styles.links}>
        <Preheader text={'preferences'} />
        <Link
          text={'Account'}
          redirectTo={'Account'}
          iconConfig={{name: 'user', type: 'feather'}}
        />
        <Link
          text={'Notifications'}
          redirectTo={'Notifications'}
          iconConfig={{name: 'bell', type: 'feather'}}
        />
        <Link
          text={'Help'}
          redirectTo={'Help'}
          iconConfig={{name: 'help-circle', type: 'feather'}}
        />
        <Setting
          text={'Dark mode'}
          action={toggleDarkMode}
          iconConfig={{name: 'moon', type: 'feather'}}
          component={<Checkbox state={isDarkModeEnabled} />}
        />
      </View>

      <View style={styles.links}>
        <Preheader text={'content'} />
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
      </View>
    </SafeAreaView>
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
  links: {
    marginHorizontal: 14,
  },
  settingsText: {
    color: colors.gray,
    marginRight: 7,
  },
});
