import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {MainStyles} from '../../../assets/styles/MainStyles';
import {colors} from '../../../utils/constants';
import {IconProps} from '../../../utils/types';
import {Info} from './Info';

interface Props {
  text: string;
  redirectTo: string;
  iconConfig?: IconProps;
}

export const Link = ({text, redirectTo, iconConfig}: Props) => {
  const {navigate} = useNavigation<any>();

  const handlePress = () => {
    if (redirectTo && redirectTo !== '' && typeof redirectTo === 'string') {
      navigate(redirectTo);
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={styles.container}>
        <Info text={text} icon={iconConfig} />
        <Icon
          name={'chevron-right'}
          type={'feather'}
          color={colors.gray}
          size={21}
        />
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
