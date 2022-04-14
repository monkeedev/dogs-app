import React from 'react';
import {ColorValue, StyleSheet, Text} from 'react-native';
import {colors, text} from '../../utils/constants';

interface Props {
  text: string;
  color?: ColorValue;
}

export const Title = ({text, color}: Props) => {
  return (
    <Text style={{...styles.text, color: color ?? colors.black}}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: text.l,
    fontWeight: '900',
  },
});
