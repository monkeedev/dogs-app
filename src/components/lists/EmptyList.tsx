import {ColorValue, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {colors} from '../../utils/constants';

interface Props {
  title?: string;
  color?: ColorValue;
}

const EmptyList = ({title, color}: Props) => {
  return (
    <View>
      <Text style={[styles.text, {color: color ?? colors.turquoise}]}>
        {title ?? 'List is empty'}
      </Text>
      <Icon
        name={'sad-outline'}
        type={'ionicon'}
        size={28}
        color={color ?? colors.turquoise}
        tvParallaxProperties={false}
      />
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginBottom: 7,
    fontSize: 21,
    fontWeight: 'bold',
  },
});
