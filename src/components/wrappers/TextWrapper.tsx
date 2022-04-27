import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  children: JSX.Element | JSX.Element[];
  shouldCenterize?: boolean;
}

export const TextWrapper: React.FC<Props> = ({children, shouldCenterize}) => {
  return (
    <View
      style={{
        ...styles.container,
        ...styles[shouldCenterize ? 'center' : 'normal'],
      }}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 14,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  normal: {},
});
