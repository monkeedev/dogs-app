import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {colors} from '../../utils/constants';
import {MainStyles} from '../../assets/styles/MainStyles';
import Title from '../../components/texts/Title';
import Link from './Components/Link';
import Preheader from '../../components/texts/Preheader';
import Setting from './Components/Setting';
import {useSelector} from 'react-redux';
import {getDogsCatalog} from '../../redux/rootSelector';
import RNFS from 'react-native-fs';
import Checkbox from '../../components/buttons/Checkbox';
import {useNavigationState} from '@react-navigation/native';

const USER = 'User'; // test constant

const UserScreen = () => {
  const navState = useNavigationState(state => state);
  const {bookmarks} = useSelector(getDogsCatalog);

  const [size, setSize] = useState<number>(0);
  const [isDarkModeEnabled, setDarkMode] = useState<boolean>(false);

  // check cache size
  const getSize = useCallback(async () => {
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
    getSize();
  }, [getSize, navState]);

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
          action={() => console.log('@callModal(Bookmarks)')}
          iconConfig={{name: 'bookmark', type: 'feather'}}
          component={
            <Text style={styles.settingsText}>{bookmarks.length}</Text>
          }
        />
        <Setting
          text={'Cache'}
          action={() => console.log('@callModal(Cache)')}
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
    marginTop: 9,
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

export default UserScreen;
