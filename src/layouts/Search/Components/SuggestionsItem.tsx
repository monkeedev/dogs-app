import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {MainStyles} from '../../../assets/styles/MainStyles';
import {colors, text} from '../../../utils/constants';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {parseDog} from '../../../utils/functions';

const ICON_SIZE = 40;

interface Props {
  value: string;
}

export const SuggestionsItem = ({value}: Props) => {
  return (
    <View style={styles.container}>
      <View style={MainStyles.rowFull}>
        <View style={styles.icon} />
        <Text style={styles.text}>{parseDog(value)}</Text>
      </View>
      <Icon name={'chevron-right'} type={'feather'} color={colors.darkGray} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...MainStyles.rowFull,
    marginHorizontal: 14,
    marginVertical: 7,
  },
  text: {
    fontSize: text.m,
    color: colors.darkGray,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    backgroundColor: 'red',
    marginRight: 7,
    borderRadius: ICON_SIZE,
  },
});
