import React, {ReactElement} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {CustomStatusBar} from '..';
import {useTheme} from '../../assets/theme';
import {getUserStorage} from '../../redux/rootSelector';

interface Props {
  children: ReactElement | ReactElement[];
}

export const GalleryWrapper = ({children}: Props) => {
  const {mode} = useTheme();
  const {theme} = useSelector(getUserStorage);

  return (
    <View style={{...styles.container, backgroundColor: mode.background}}>
      <CustomStatusBar
        backgroundColor={'transparent'}
        barStyle={`${theme === 'dark' ? 'light' : 'dark'}-content`}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
