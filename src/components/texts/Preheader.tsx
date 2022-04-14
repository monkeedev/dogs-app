import React from 'react';
import {ColorValue, StyleSheet, Text, View} from 'react-native';
import {MainStyles} from '../../assets/styles/MainStyles';
import {colors, text} from '../../utils/constants';

interface Props {
  text: string;
  color?: ColorValue;
}

export const Preheader = ({text, color}: Props) => {
  const c = color ?? colors.gray;

  return (
    <View style={styles.container}>
      <Text style={{...styles.text, color: c}}>{text}</Text>
      <View style={{...styles.border, backgroundColor: c}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...MainStyles.rowFull,
    marginBottom: 7,
    marginTop: 35,
  },
  text: {
    fontSize: text.s,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  border: {
    marginLeft: 7,
    flex: 1,
    height: 1,
  },
});
