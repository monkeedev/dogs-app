import React from 'react';
import {ColorValue, StyleSheet, Text} from 'react-native';
import {useTheme} from '../../assets/theme';
import {text} from '../../utils/constants';

interface Props {
  text: string;
  color?: ColorValue;
}

export const Title = ({text, color}: Props) => {
  const {mode} = useTheme();

  return <Text style={{...styles.text, color: mode.text}}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: text.l,
    fontWeight: '900',
  },
});
