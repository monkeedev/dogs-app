import React, {ReactElement} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useTheme} from '../../assets/theme';

interface Props {
  children: ReactElement | ReactElement[];
}

export const DefaultWrapper = ({children}: Props) => {
  const {mode} = useTheme();

  return (
    <SafeAreaView style={{...styles.container, backgroundColor: mode.card}}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
