import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useTheme} from '../../assets/theme';
import {colors, springConfig} from '../../utils/constants';

interface Props {
  state: boolean;
  isControlled?: boolean;
}

const CHECKBOX_HEIGHT = 28;
const CHECKBOX_WIDTH = 56;

export const Checkbox = ({state, isControlled}: Props) => {
  const isToggled = useSharedValue(+state);
  const {mode} = useTheme();

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: withSpring(
      interpolateColor(
        isToggled.value,
        [0, 1],
        [colors.gray, colors.turquoise],
      ),
      springConfig,
    ),
  }));

  const circleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(
          interpolate(
            isToggled.value,
            [0, 1],
            [0, CHECKBOX_WIDTH - CHECKBOX_HEIGHT],
          ),
          springConfig,
        ),
      },
    ],
  }));

  useAnimatedReaction(
    () => state,
    () => (isToggled.value = +state),
    [state],
  );

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.View
        style={[{...styles.circle, backgroundColor: mode.card}, circleStyle]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CHECKBOX_WIDTH,
    height: CHECKBOX_HEIGHT,
    borderRadius: CHECKBOX_HEIGHT,
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 1,
  },
  circle: {
    width: CHECKBOX_HEIGHT - 4,
    height: CHECKBOX_HEIGHT - 4,
    borderRadius: CHECKBOX_HEIGHT,
  },
});
