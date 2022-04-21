import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {MainStyles} from '../../assets/styles/MainStyles';
import {Title} from '../../components/texts';
import {DefaultWrapper} from '../../components/wrappers/DefaultWrapper';
import {getUserStorage} from '../../redux/rootSelector';
import {colors} from '../../utils/constants';
import {isAndroid} from '../../utils/functions';
import {User} from '../../utils/types';
import {BookmarksLink, CacheLink, List} from './Components';
import {DarkModeToggler} from './Components/DarkModeToggler';
import {LogOutLink} from './Components/LogOutLink';

export const UserScreen = () => {
  const {user} = useSelector(getUserStorage);

  return (
    <DefaultWrapper>
      <View style={styles.header}>
        <Title text={`Hello, ${(user as User).login}!`} />
      </View>

      <List title={'preferences'}>
        <DarkModeToggler />
      </List>

      <List title={'content'}>
        <BookmarksLink />
        <CacheLink />
      </List>

      <List title={'actions'}>
        <LogOutLink />
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
});
