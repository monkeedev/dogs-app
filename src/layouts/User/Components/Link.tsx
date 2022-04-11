import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, text} from '../../../utils/constants';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {MainStyles} from '../../../assets/styles/MainStyles';
import {IconProps} from '../../../utils/types';
import Info from './Info';
import {useNavigation} from '@react-navigation/native';

interface Props {
  text: string;
  redirectTo: string;
  iconConfig?: IconProps;
}

const Link = ({text, redirectTo, iconConfig}: Props) => {
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

export default Link;

const styles = StyleSheet.create({
  container: {
    ...MainStyles.rowFull,
    marginVertical: 7,
  },
});
