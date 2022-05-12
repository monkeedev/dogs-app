import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {colors} from '../../utils/constants';

export const GoBack = () => {
  const {goBack} = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable testID={'GoBack_Button'} onPress={goBack}>
        <Icon
          name={'arrow-back'}
          type={'ionicon'}
          size={18}
          color={colors.darkGray}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 14,
    left: 14,
    zIndex: 1,
    elevation: 1,
    backgroundColor: colors.white,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
  },
});
