import {View, Text, ColorValue, StyleSheet} from 'react-native';
import React from 'react';
import {colors, text} from '../../utils/constants';

interface Props {
  text: string;
  color?: ColorValue;
}

const Title = ({text, color}: Props) => {
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

export default Title;
