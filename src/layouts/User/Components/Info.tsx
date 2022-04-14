import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {colors} from '../../../utils/constants';
import {IconProps} from '../../../utils/types';

interface Props {
  text: string;
  icon?: IconProps;
}

const ICON_SIZE = 35;

export const Info = ({text, icon}: Props) => {
  return (
    <>
      {icon && Object.keys(icon).length > 0 && (
        <Icon style={styles.icon} color={colors.white} size={21} {...icon} />
      )}
      <Text style={styles.text}>{text}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
  },
  icon: {
    marginRight: 7,
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE,
    justifyContent: 'center',
    backgroundColor: colors.turquoise,
  },
});
