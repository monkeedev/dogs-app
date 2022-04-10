import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors, text} from '../../utils/constants';
import {MainStyles} from '../../assets/styles/MainStyles';
import Title from '../../components/texts/Title';
import Link from './Components/Link';
import Preheader from '../../components/texts/Preheader';
import Setting from './Components/Setting';
import {useSelector} from 'react-redux';
import {getDogsCatalog} from '../../redux/rootSelector';

const USER = 'User'; // test constant

const UserScreen = () => {
  const {bookmarks} = useSelector(getDogsCatalog);

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
          action={() => console.log('@dark_mode')}
          iconConfig={{name: 'moon', type: 'feather'}}
        />
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
          component={<Text style={styles.settingsText}>300 MB</Text>}
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
