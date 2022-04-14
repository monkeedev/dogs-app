import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {SearchInput} from '.';
import {MainStyles} from '../../assets/styles/MainStyles';
import {colors, springConfig, text} from '../../utils/constants';

interface Props {
  value: string;
  onChangeText: (str: string) => void;
}

const MAX_INPUT_WIDTH = Dimensions.get('screen').width - 14;
const CLEAR_BUTTON_WIDTH = 56;

export const SearchBar = ({value, onChangeText}: Props) => {
  const {goBack} = useNavigation();
  const [isMounted, setMounted] = useState(false);

  const inputStyles = useAnimatedStyle(
    () => ({
      width: withSpring(
        interpolate(
          +isMounted,
          [0, 1],
          [MAX_INPUT_WIDTH, MAX_INPUT_WIDTH - CLEAR_BUTTON_WIDTH],
          Extrapolate.CLAMP,
        ),
        springConfig,
      ),
    }),
    [],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.input, inputStyles]}>
        <SearchInput
          value={value}
          onChangeText={onChangeText}
          isAutofocused={true}
        />
      </Animated.View>
      <Pressable onPress={goBack}>
        <View style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Cancel</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...MainStyles.rowFull,
    marginHorizontal: 7,
  },
  input: {
    marginRight: 7,
  },
  clearButton: {
    width: CLEAR_BUTTON_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    paddingRight: 7,
  },
  clearButtonText: {
    fontSize: text.s,
    fontWeight: '700',
    color: colors.darkGray,
  },
});
