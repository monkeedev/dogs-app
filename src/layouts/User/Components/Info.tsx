import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IconProps} from '../../../utils/types';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {colors} from '../../../utils/constants';

interface Props {
  text: string;
  icon?: IconProps;
}

const ICON_SIZE = 35;

const Info = ({text, icon}: Props) => {
  return (
    <>
      {icon && Object.keys(icon).length > 0 && (
        <Icon style={styles.icon} color={colors.white} size={21} {...icon} />
      )}
      <Text style={styles.text}>{text}</Text>
    </>
  );
};

export default Info;

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
