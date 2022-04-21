import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../assets/theme';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const DefaultWrapper = ({children}: Props) => {
  const {top} = useSafeAreaInsets();
  const {mode} = useTheme();

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: top,
        backgroundColor: mode.card,
      }}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
