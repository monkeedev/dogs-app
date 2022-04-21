import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {MainStyles} from '../../../assets/styles/MainStyles';
import {colors} from '../../../utils/constants';
import {IconProps} from '../../../utils/types';
import {Info} from './Info';

interface Props {
  text: string;
  action: () => void;
  enableIcon?: boolean;
  iconConfig?: IconProps;
}

export const Link = ({text, action, iconConfig, enableIcon}: Props) => {
  const handlePress = () => {
    if (action && typeof action === 'function') {
      action();
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
      <View style={styles.container}>
        <Info text={text} icon={iconConfig} />

        {enableIcon ? (
          <Icon
            name={'chevron-right'}
            type={'feather'}
            color={colors.gray}
            size={21}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...MainStyles.rowFull,
    marginVertical: 7,
  },
});
