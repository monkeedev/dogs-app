import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {colors} from '../utils/constants';
import {useNavigation} from '@react-navigation/native';

const GoBack = () => {
  const {goBack} = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable onPress={goBack}>
        <Icon
          name={'arrow-back'}
          type={'ionicon'}
          tvParallaxProperties={false}
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

export default GoBack;
