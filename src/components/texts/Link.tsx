import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, text} from '../../utils/constants';
import {ExtendedNavigationProp} from '../../utils/types';

interface Props {
  navigateConfig: {
    key: string;
    params?: any;
  };
  text: string;
}

export const Link: React.FC<Props> = ({navigateConfig, text}) => {
  const {navigate} =
    useNavigation<
      ExtendedNavigationProp<
        typeof navigateConfig.key,
        typeof navigateConfig.params
      >
    >();

  const handleNavigate = () => {
    const {key, params} = navigateConfig;

    if (key !== '') {
      navigate(key, params);
    }
  };

  return (
    <TouchableOpacity onPress={handleNavigate} activeOpacity={0.8}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: text.s,
    color: colors.turquoise,
  },
});
