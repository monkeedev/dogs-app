import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import CatalogScreen from '../Catalog/CatalogScreen';
import {tabs} from './tabs';
import {colors} from '../../utils/constants';
import {Icon} from 'react-native-elements';
import Animated, {
  ColorSpace,
  interpolate,
  interpolateColor,
  interpolateColors,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const RADIUS = 14;
const TAB_BAR_HEIGHT = 56;

const Tab = createBottomTabNavigator();

const TabBar = ({state, descriptors, navigation}) => {
  const width = useSharedValue(0);
  const activeIdx = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => ({
    width: width.value - 7 * 2,
    opacity: withSpring(+(width.value !== 0)),
    transform: [
      {
        translateX: withTiming(width.value * activeIdx.value, {duration: 300}),
      },
    ],
  }));

  const oStyles = useAnimatedStyle(() => ({
    opacity: withSpring(+(width.value !== 0)),
  }));

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
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
            navigation.navigate({name: route.name, merge: true});
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

      <Animated.View style={[styles.icon, rStyle]} pointerEvents={'none'} />
    </View>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{headerShown: false}}
        tabBar={props => <TabBar {...props} />}>
        {tabs.map(
          ({name, component, icon: {activeName, defaultName, type, size}}) => (
            <Tab.Screen
              key={name}
              name={name}
              component={component}
              options={{
                tabBarIcon: focused => (
                  <Icon
                    name={focused ? activeName : defaultName}
                    color={focused ? colors.white : colors.turquoise}
                    type={type}
                    tvParallaxProperties={false}
                    size={size}
                  />
                ),
              }}
            />
          ),
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    paddingHorizontal: 7,
    height: TAB_BAR_HEIGHT,
    borderTopLeftRadius: RADIUS,
    borderTopRightRadius: RADIUS,
  },
  icon: {
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

export default MainNavigator;
