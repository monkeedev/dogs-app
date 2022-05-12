import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useTheme} from '../../../assets/theme';
import {colors, springConfig} from '../../../utils/constants';

const RADIUS = 14;
const TAB_BAR_HEIGHT = 56;

interface Props {
  state: any;
  descriptors: any;
  navigation: any;
}

export const TabBar = ({state, descriptors, navigation}: Props) => {
  const {mode} = useTheme();

  const width = useSharedValue(0);
  const activeIdx = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => ({
    width: width.value - 7 * 2,
    opacity: withSpring(+(width.value !== 0), springConfig),
    transform: [
      {
        translateX: withSpring(width.value * activeIdx.value, springConfig),
      },
    ],
  }));

  const oStyles = useAnimatedStyle(() => ({
    opacity: withSpring(+(width.value !== 0), springConfig),
  }));

  useAnimatedReaction(
    () => state.index,
    () => {
      activeIdx.value = state.index;
    },
    [state.index],
  );

  return (
    <View style={{...styles.container, backgroundColor: mode.primary}}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const handlePress = () => {
          'worklet';
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          activeIdx.value = index;

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate(
              {name: route.name, merge: true},
              {activeIdx: index},
            );
          }
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={handlePress}
            style={{flex: 1}}
            onLayout={e => (width.value = e.nativeEvent.layout.width)}>
            <Animated.View style={oStyles}>
              {options.tabBarIcon(isFocused)}
            </Animated.View>
          </TouchableOpacity>
        );
      })}

      <Animated.View style={[styles.box, rStyle]} pointerEvents={'none'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    height: TAB_BAR_HEIGHT,
  },
  box: {
    borderRadius: RADIUS,
    marginHorizontal: 14,
    paddingHorizontal: 28,
    height: TAB_BAR_HEIGHT / 1.25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: TAB_BAR_HEIGHT / 2 - TAB_BAR_HEIGHT / 1.25 / 2,
    backgroundColor: colors.turquoise,
    zIndex: -1,
  },
});
