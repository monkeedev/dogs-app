import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {ReactElement} from 'react';
import {colors, text} from '../../../utils/constants';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {MainStyles} from '../../../assets/styles/MainStyles';
import {IconProps} from '../../../utils/types';
import Info from './Info';

interface Props {
  text: string;
  action: () => void;
  component?: ReactElement;
  iconConfig?: IconProps;
}

const Setting = ({text, action, iconConfig, component}: Props) => {
  const handlePress = () => {
    if (action && typeof action === 'function') {
      action();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.container}>
        <Info text={text} icon={iconConfig} />
        {component}
      </View>
    </TouchableOpacity>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    ...MainStyles.rowFull,
    marginVertical: 7,
  },
});
